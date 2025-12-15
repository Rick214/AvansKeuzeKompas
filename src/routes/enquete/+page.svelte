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
    isLoading = true; // start spinner
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
      isLoading = false; // stop spinner
    }
  }
</script>

<div class="max-w-md mx-auto p-6 bg-gray-800 rounded-lg text-white">

  <!-- Progress bar -->
  <div class="flex mb-6 space-x-2">
    {#each Array(questions.length + 2) as _, i}
      <div
        class="h-2 flex-1 rounded-full"
        style="background-color: {i <= step ? '#FFD700' : '#374151'}"
      ></div>
    {/each}
  </div>

  <!-- Content -->
  {#if step === 0}
    <div class="mb-4">
      <h2 class="text-lg font-bold mb-2">Welkom bij de enquête</h2>
      <p>Bedankt dat je de tijd neemt om deze korte vragenlijst in te vullen. Klik op 'Volgende' om te starten.</p>
    </div>
  {:else if step <= questions.length}
    <h2 class="text-lg font-bold mb-2">{questions[step - 1].label}</h2>
    <RadioForm
      items={questions[step - 1].options.map(o => ({ label: o, value: o }))}
      bind:selected={answers[step - 1]}
    />
    {#if errorMessage}
      <p class="text-red-400 mt-2">{errorMessage}</p>
    {/if}
  {:else}
    <div class="mb-4">
      <h2 class="text-lg font-bold mb-2">Bedankt!</h2>
      <p>Je hebt de enquête volledig ingevuld. Klik op 'Afronden' om je antwoorden te versturen.</p>
    </div>
  {/if}

  <!-- Navigatie -->
  <div class="flex justify-between mt-4">
    <button
      type="button"
      class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
      on:click={() => step = Math.max(0, step - 1)}
      disabled={step === 0}
    >
      Vorige
    </button>

    {#if step <= questions.length}
      <button
        type="button"
        class="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black"
        on:click={handleNext}
      >
        Volgende
      </button>
    {:else}
     <button
        type="button"
        class="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center gap-2"
        on:click={handleSubmit}
        disabled={isLoading}
      >
        {#if isLoading}
          <svg class="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        {/if}
        Afronden
      </button>
    {/if}
  </div>
</div>
