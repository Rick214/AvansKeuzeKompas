<script lang="ts">
  import RadioForm from '$lib/components/ui/RadioForm.svelte';
  import { preferences, translations } from '$lib/stores/userPreferences';
  import questions_nl_NL from '$lib/data/questions_nl_NL.json';
  import questions_en_US from '$lib/data/questions_en_US.json';
  import { Circle } from 'svelte-loading-spinners';

  let step = 0;
  type TranslationKey = keyof typeof $translations;
  let errorKey: TranslationKey | null = null;  let isLoading = false;
  let questions = questions_nl_NL; // default

  let showTooltip = false;

  let responses: { answer: string | null; rating: number }[] = questions.map(() => ({ answer: null, rating: 0 }));
  let hoverRatings: number[] = questions.map(() => 0);

  function setAnswer(index: number, value: string) {
    responses[index].answer = value;
  }

  function setRating(index: number, value: number) {
    responses[index].rating = value;
  }

  function setHover(index: number, value: number) {
    hoverRatings[index] = value;
  }

  function clearHover(index: number) {
    hoverRatings[index] = 0;
  }

  function toggleTooltip() {
    showTooltip = !showTooltip;
  }

  // Subscribe to language preference for live updates
  preferences.subscribe(p => {
    questions = p.language === 'en_US' ? questions_en_US : questions_nl_NL;
  });

   async function handleNext() {
    if (step > 0) {
      const current = responses[step - 1];
      if (!current.answer) {
        errorKey = 'enquete_error_missing_value';
        return;
      }

      if (!current.rating) {
        errorKey = 'enquete_error_missing_rating';
        return;
      }
    }

    errorKey = null;
    step < questions.length ? step += 1 : step += 1;
  }

  // API

  // MUST BE CHANGED LATER TO ACTUAL API ENDPOINT
  async function handleSubmit() {
    isLoading = true;
    try {
      const answerList = responses.map((r, i) => ({
        questionNumber: i + 1,
        answer: r.answer,
        rating: r.rating
      }));

      // FOR DEBUGGING PURPOSES
      console.log('Submitting answers:', answerList);

      const response = await fetch('/api/enquete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answerList })
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
        <p class="text-md text-(--primary-color) text-start">{@html $translations.enquete_introduction_message_html}</p>
      </div>
    {:else if step <= questions.length}
      <h2 class="relative inline-flex items-center gap-2 text-md font-medium mb-2 text-start">
        {step + ". " + questions[step - 1].label}

        <!-- Info icon -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span
          class="relative cursor-pointer"
          on:mouseenter={() => showTooltip = true}
          on:mouseleave={() => showTooltip = false}
          on:click={toggleTooltip}
        >
          <i class="fa-solid fa-circle-info text-(--color-accent)"></i>

          <!-- Tooltip -->
          {#if showTooltip}
            <div
              class="pointer-events-none absolute left-1/2 bottom-full z-20 mb-3
                    -translate-x-3/4 translate-y-[115%] rounded-xl bg-(--color-surface) border border-(--color-border)
                    p-4 text-sm text-(--primary-color) shadow-lg
                    transition-opacity duration-200
                    w-96 max-w-48 
                    md:max-w-96 md:-translate-x-1/4 md:translate-y-0"
            >
              <div class="relative z-10 p-2 text-sm text-(--primary-color)">
                <p class="font-medium text-lg mb-2">{$translations.enquete_popup_title}</p>
                <p class="mb-4 text-sm">
                  {@html questions[step - 1].explanation}
                </p>
              </div>

              <!-- Arrow -->
              <div
                class="absolute bg-(--color-surface)
                      border-r border-b border-(--color-border)
                      z-0 h-4 w-4
                      -top-2 left-3/4 -translate-x-3/6 -rotate-135
                      md:top-auto md:-bottom-2 md:left-1/4 md:h-4 md:w-4 md:-translate-x-1/2 md:rotate-45">
              </div>
            </div>
          {/if}
        </span>
      </h2>

     <RadioForm
        items={questions[step - 1].options.map(o => ({ label: o, value: o, name: questions[step - 1].name }))}
        bind:selected={responses[step - 1].answer}
        on:change={(e) => setAnswer(step - 1, e.detail)}
      />

      <!-- Rating bolletjes onder de RadioForm -->
      <h2 class="text-md font-bold mt-8">{$translations.enquete_rating_title}</h2>
      <div class="flex gap-2 mt-4">
        {#each Array(5) as _, i}
          <button
            type="button"
            class="w-6 h-6 rounded-full transition-colors duration-200"
            class:bg-(--color-accent)={i < (hoverRatings[step - 1] || responses[step - 1].rating)}
            class:bg-(--color-surface-alt)={i >= (hoverRatings[step - 1] || responses[step - 1].rating)}
            on:click={() => setRating(step - 1, i + 1)}
            on:mouseover={() => setHover(step - 1, i + 1)}
            on:mouseout={() => clearHover(step - 1)}
          ></button>
        {/each}
      </div>

      {#if errorKey}
        <p class="text-sm font-medium text-(--color-inactive) mt-4">
          {$translations[errorKey]}
        </p>
      {/if}
      
    {:else}
      <div class="mb-4">
        <h2 class="text-md font-medium mb-2 text-start">{$translations.enquete_completion_title}</h2>
        <p class="text-md text-(--primary-color) text-start">{$translations.enquete_completion_message}</p>
      </div>
    {/if}

    <!-- Navigation -->
    <div class="flex justify-between mt-8">
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