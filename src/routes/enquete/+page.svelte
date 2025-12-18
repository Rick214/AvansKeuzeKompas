<script lang="ts">
  import RadioForm from '$lib/components/ui/RadioForm.svelte';
  import { preferences, translations } from '$lib/stores/userPreferences';
  import questions_nl_NL from '$lib/data/questions_nl_NL.json';
  import questions_en_US from '$lib/data/questions_en_US.json';
  import { Circle } from 'svelte-loading-spinners';

  let step = 0;
  let answers: (string | null)[] = [];
  let errorMessage = '';
  let isLoading = false;
  let questions = questions_nl_NL; // default

  // Subscribe to language preference for live updates
  preferences.subscribe(p => {
    questions = p.language === 'en_US' ? questions_en_US : questions_nl_NL;
    // reset answers array if question list changes
    answers = Array(questions.length).fill(null);
  });

  async function handleNext() {
    if (step > 0 && step <= questions.length && !answers[step - 1]) {
      errorMessage = $translations.enquete_error_missing_value;
      return;
    }
    errorMessage = '';
    step < questions.length ? step += 1 : step += 1;
  }

  // MUST BE CHANGED LATER TO ACTUAL API ENDPOINT
  async function handleSubmit() {
    isLoading = true;
    try {
      // FOR DEBUGGING PURPOSES
      console.log('Submitting answers:', answers);
      console.log(JSON.stringify({ answers }));

      const response = await fetch('/api/enquete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (response.ok) alert($translations.enquete_thank_you_message);
      else alert($translations.enquete_error_submission_failed);
    } catch (err) {
      console.error(err);
      alert($translations.enquete_error_submission_failed);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full sm:w-4/5 md:w-3/5 lg:w-3/6 xl:w-3/6 2xl:w-2/6 p-12 bg-(--color-surface) rounded-3xl shadow-lg">
    <h1 class="text-xl font-bold text-(--primary-color) text-center mb-6">{$translations.enquete_title}</h1>

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
        <h2 class="text-md font-medium mb-2 text-start">{$translations.enquete_introduction_title}</h2>
        <p class="text-md text-(--primary-color) text-start">{@html $translations.enquete_introduction_message}</p>
      </div>
    {:else if step <= questions.length}
      <h2 class="text-md font-bold mb-6">{questions[step - 1].label}</h2>
      <RadioForm
        items={questions[step - 1].options.map(o => ({ label: o, value: o, name: questions[step - 1].name }))}
        bind:selected={answers[step - 1]}
      />
      {#if errorMessage}
        <p class="text-sm font-normal text-(--color-inactive) mt-2">{$translations.enquete_error_missing_value}</p>
      {/if}
    {:else}
      <div class="mb-4">
        <h2 class="text-md font-medium mb-2 text-start">{$translations.enquete_completion_title}</h2>
        <p class="text-md text-(--primary-color) text-start">{$translations.enquete_completion_message}</p>
      </div>
    {/if}

    <!-- Navigation -->
    <div class="flex justify-between mt-6">
      <button
        type="button"
        class="w-24 sm:w-32 px-4 py-2 rounded-xl bg-(--color-accent) text-black opacity-75 hover:opacity-100 transition-opacity"
        on:click={() => step = Math.max(0, step - 1)}
        disabled={step === 0}
      >
        {$translations.enquete_previous}
      </button>

      {#if step <= questions.length}
        <button
          type="button"
          class="w-24 sm:w-32 px-4 py-2 rounded-xl bg-(--color-accent) text-black opacity-90 hover:opacity-100 transition-opacity"
          on:click={handleNext}
        >
        {$translations.enquete_next}
        </button>
      {:else}
        <button
          type="button"
          class="{isLoading && "flex justify-between"} w-24 sm:w-32 px-4 py-2 rounded-xl bg-(--color-accent) text-black opacity-75 hover:opacity-100 transition-opacity"
          on:click={handleSubmit}
          disabled={isLoading}
        >
          {#if isLoading}
            <Circle size="24" color="var(--color-bg)" unit="px" duration="1s" />
            <p class="ml-2">{$translations.enquete_submit}</p>
          {:else}
            {$translations.enquete_submit}
          {/if}
        </button>
      {/if}
    </div>
  </div>
</div>