<script lang="ts">
  import { dummyModules } from '$lib/data/dummyModules';
  import SearchAndFilters from '$lib/components/ui/SearchFilterPage/SearchAndFilters.svelte';
  import ModuleGrid from '$lib/components/ui/SearchFilterPage/ModuleGrid.svelte';

  let search = '';
  let locationFilter = 'all';
  let levelFilter = 'all';
  let ectsFilter = 'all';
  let sort = 'popular';

  $: filtered = dummyModules
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    .filter(m => locationFilter === 'all' ? true : m.location === locationFilter)
    .filter(m => levelFilter === 'all' ? true : m.level === levelFilter)
    .filter(m => ectsFilter === 'all' ? true : m.studycredit === Number(ectsFilter))
    .sort((a, b) => {
      if (sort === 'popular') return b.popularity_score - a.popularity_score;
      if (sort === 'az') return a.name.localeCompare(b.name);
      if (sort === 'za') return b.name.localeCompare(a.name);
      return 0;
    });

  function handleSearchChange(value: string) {
    search = value;
  }

  function handleFilterChange(type: string, value: string) {
    if (type === 'location') locationFilter = value;
    if (type === 'level') levelFilter = value;
    if (type === 'ects') ectsFilter = value;
    if (type === 'sort') sort = value;
  }
</script>

<div class="min-h-screen bg-(--color-bg) text-(--primary-color) font-(--font-primary)">
  <div class="sticky top-15 z-20 bg-(--color-bg)">
    <SearchAndFilters
      {search}
      {locationFilter}
      {levelFilter}
      {ectsFilter}
      {sort}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
    />
  </div>

  <div class="max-w-6xl mx-auto px-4 py-6">
    <ModuleGrid modules={filtered} />
  </div>
</div>
