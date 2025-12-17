<script lang="ts">
  import RadioForm from '$lib/components/ui/RadioForm.svelte';
  import questions from '$lib/data/questions.json';

  let step = 0;
  let answers: (string | null)[] = Array(questions.length).fill(null);
  let errorMessage = '';
  let isLoading = false;

  async function handleNext() {
    if (step > 0 && step <= questions.length && !answers[step - 1]) {
      errorMessage = 'Vul eerst een antwoord in voordat je verdergaat.';
      return;
    }
    errorMessage = '';
    step < questions.length ? step += 1 : step += 1;
  }

  async function handleSubmit() {
    isLoading = true;
    try {
      const response = await fetch('/api/enquete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (response.ok) alert('Bedankt! Je antwoorden zijn verstuurd.');
      else alert('Er ging iets mis bij het versturen.');
    } catch (err) {
      console.error(err);
      alert('Er ging iets mis bij het versturen.');
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- Centered container -->
<div class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full sm:w-4/5 md:w-3/5 lg:w-3/6 xl:w-3/6 2xl:w-2/6 p-12 bg-(--color-surface) rounded-xl shadow-lg">
    <h1 class="text-xl font-bold text-(--primary-color) text-center mb-6">Vragenlijst</h1>

    <!-- Progress bar -->
    <div class="flex mb-8 space-x-2">
      {#each Array(questions.length + 2) as _, i}
        <div
          class="h-2 flex-1 rounded-full transition-colors duration-300"
          style="background-color: {i <= step ? 'var(--color-accent)' : 'var(--color-surface-alt)'}"
        ></div>
      {/each} 
    </div>

    <!-- Content -->
    {#if step === 0}
      <div class="mb-6">
        <h2 class="text-md font-medium mb-2 text-start">Welkom bij de enquête</h2>
        <p class="text-md text-(--primary-color) text-start">Bedankt dat je de tijd neemt om deze korte vragenlijst in te vullen. Klik op 'Volgende' om te starten.</p>
      </div>
    {:else if step <= questions.length}
      <h2 class="text-md font-bold mb-6">{questions[step - 1].label}</h2>
      <RadioForm
        items={questions[step - 1].options.map(o => ({ label: o, value: o }))}
        bind:selected={answers[step - 1]}
      />
      {#if errorMessage}
        <p class="text-sm font-normal text-(--color-inactive) mt-2">{errorMessage}</p>
      {/if}
    {:else}
      <div class="mb-4">
        <h2 class="text-md font-medium mb-2 text-start">Bedankt!</h2>
        <p class="text-md text-(--primary-color) text-start">Je hebt de enquête volledig ingevuld. Klik op 'Afronden' om je antwoorden te versturen.</p>
      </div>
    {/if}

    <!-- Navigatie -->
    <div class="flex justify-between mt-6">
      <button
        type="button"
        class="px-4 py-2 rounded bg-(--color-accent) text-black opacity-75 hover:opacity-100 transition-opacity"
        on:click={() => step = Math.max(0, step - 1)}
        disabled={step === 0}
      >
        Vorige
      </button>

      {#if step <= questions.length}
        <button
          type="button"
          class="px-4 py-2 rounded bg-(--color-accent) text-black opacity-90 hover:opacity-100 transition-opacity"
          on:click={handleNext}
        >
          Volgende
        </button>
      {:else}
        <button
          type="button"
        class="px-4 py-2 rounded bg-(--color-accent) text-black opacity-75 hover:opacity-100 transition-opacity"
          on:click={handleSubmit}
          disabled={isLoading}
        >
          {#if isLoading}
            <svg class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <!-- buitenste cirkel -->
              <circle 
                class="opacity-25 stroke-(--color-surface)" 
                cx="12" cy="12" r="10"
                stroke-width="4">
              </circle>

              <!-- draaiend pad -->
              <path 
                class="opacity-75 fill-(--color-surface-alt)" 
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
              </path>
            </svg>
          {/if}
          Afronden
        </button>
      {/if}
    </div>
  </div>
</div>
