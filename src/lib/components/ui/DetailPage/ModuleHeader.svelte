<script lang="ts">
  import { translations } from '$lib/stores/userPreferences';
  export let module;
  const MAX_RATING = 5;

  $: filledDots = Math.min(
    MAX_RATING,
    Math.round(module.popularity_score / 100)
  );
</script>

<div
  class="w-full bg-(--color-surface) px-6 md:px-10 py-5 pt-30 md:pt-45 flex items-end justify-between">
  <h1 class="font-(--font-heading) text-lg md:text-2xl font-bold">
    {module.name}
  </h1>

  <div class="flex items-center gap-3">
    <span class="hidden lg:inline text-sm font-bold">
      {$translations.rating}
    </span>
    {#each Array(MAX_RATING) as _, i}
      <span
        class="w-4 h-4 md:w-6 md:h-6 rounded-full
        {i < filledDots
          ? 'bg-(--color-accent)'
          : 'bg-(--color-surface-alt)'}"
/>
    {/each}
  </div>
</div>
