<script lang="ts">
    import { translations } from "$lib/stores/userPreferences"

    function goBack() {
        history.back();
    }
</script>

<div class="min-h-screen flex flex-col items-center justify-center text-center px-4">
  <h1 class="text-7xl font-bold text-heading mb-4">404</h1>

  <p class="text-lg text-gray-500 mb-8">
    {$translations.page_does_not_exist}
  </p>

  <div class="flex gap-4">
    <button
      on:click={goBack}
      class="px-6 py-3 rounded bg-(--color-accent) text-black font-medium cursor-pointer
             hover:opacity-90 transition"
    >
      {$translations.back_to_previous_page}
    </button>

    <a
      href="/home"
      style="text-decoration: none; color: var(--primary-color);"
      class="px-6 py-3 rounded border border-(--color-border) color no-underline 
             hover:border-(--color-surface-alt) hover:bg-(--color-surface-alt) hover:text-(--primary-color) transition duration-200"
    >
      {$translations.back_to_home}
    </a>
  </div>
</div>
