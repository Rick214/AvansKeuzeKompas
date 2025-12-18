<script lang="ts">
  import { translations } from '$lib/stores/userPreferences';
  import type { Module } from '$lib/data/dummyModules';
  import ModuleCard from './ModuleCard.svelte';
  export let modules: Module[];
</script>

<div>
  <p class="mb-4 font-bold">{modules.length} {$translations.results}</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each modules as module}
      <ModuleCard {module} />
    {/each}
  </div>
</div>
