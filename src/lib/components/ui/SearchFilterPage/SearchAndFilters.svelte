<script lang="ts">
  import { translations } from '$lib/stores/userPreferences';
  // Props
  export let search: string;
  export let locationFilter: string;
  export let levelFilter: string;
  export let ectsFilter: string;
  export let sort: string;

  export let onSearchChange: (value: string) => void;
  export let onFilterChange: (type: string, value: string) => void;

  // Handlers with proper typing
  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    onSearchChange(target.value);
  }

  function handleSelectChange(type: string, e: Event) {
    const target = e.target as HTMLSelectElement;
    onFilterChange(type, target.value);
  }
</script>

<div class="max-w-6xl mx-auto px-4 py-4 space-y-3">
  <!-- Search Input -->
  <input
    placeholder="{$translations.search}"
    value={search}
    on:input={handleInput}
    class="w-full md:w-2/4 mx-auto block rounded-full px-4 py-2 bg-(--color-surface) text-(--primary-color)"
  />

  <!-- Filters -->
  <div class="flex flex-wrap justify-center gap-3">
    <!-- Location -->
    <select
      value={locationFilter}
      on:change={(e) => handleSelectChange('location', e)}
      class="px-4 py-2 rounded-full bg-(--color-surface) text-md font-bold"
    >
      <option value="all">{$translations.location}</option>
      <option value="Breda">Breda</option>
      <option value="Tilburg">Tilburg</option>
      <option value="Den Bosch">Den Bosch</option>
    </select>

    <!-- Level -->
    <select
      value={levelFilter}
      on:change={(e) => handleSelectChange('level', e)}
      class="px-4 py-2 rounded-full bg-(--color-surface) text-md font-bold"
    >
      <option value="all">Niveau</option>
      <option value="NLQF5">NLQF 5</option>
      <option value="NLQF6">NLQF 6</option>
    </select>

    <!-- ECTS -->
    <select
      value={ectsFilter}
      on:change={(e) => handleSelectChange('ects', e)}
      class="px-4 py-2 rounded-full bg-(--color-surface)] text-md font-bold"
    >
      <option value="all">ECTS</option>
      <option value="15">15</option>
      <option value="30">30</option>
    </select>

    <!-- Sort -->
    <select
      value={sort}
      on:change={(e) => handleSelectChange('sort', e)}
      class="px-4 py-2 rounded-full bg-(--color-surface)] text-md font-bold"
    >
      <option value="popular">{$translations.popular}</option>
      <option value="az">{$translations.alphabetical} (A–Z)</option>
      <option value="za">{$translations.alphabetical} (Z–A)</option>
    </select>
  </div>
</div>
