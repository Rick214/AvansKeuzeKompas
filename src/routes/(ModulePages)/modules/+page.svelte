<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import SearchAndFilters from '$lib/components/ui/SearchFilterPage/SearchAndFilters.svelte';
  import ModuleGrid from '$lib/components/ui/SearchFilterPage/ModuleGrid.svelte';

  import type { PageData } from './$types';
  import type { Module } from '$lib/types/vkm';
	import { translations } from '$lib/stores/userPreferences';

  export let data: PageData;

  // modules from load()
  let modules: Module[] = data.modules;

  // ───────────────────────────────────────
  // URL → FILTER STATE
  // ───────────────────────────────────────
  $: params = $page.url.searchParams;

  $: search = params.get('search') ?? '';
  $: locationFilter = params.get('location') ?? 'all';
  $: levelFilter = params.get('level') ?? 'all';
  $: ectsFilter = params.get('ects') ?? 'all';
  $: sort = params.get('sort') ?? 'popular';

  // ───────────────────────────────────────
  // UPDATE URL
  // ───────────────────────────────────────
  function updateParam(key: string, value: string) {
    const url = new URL($page.url);

    if (value === '' || value === 'all') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }

    goto(`${url.pathname}?${url.searchParams.toString()}`, {
      replaceState: true,
      keepFocus: true,
      noScroll: true
    });
  }

  function handleSearchChange(value: string) {
    updateParam('search', value);
  }

  function handleFilterChange(type: string, value: string) {
    updateParam(type, value);
  }

  // ───────────────────────────────────────
  // FILTER MODULES
  // ───────────────────────────────────────
  $: filtered = modules
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(m =>
      locationFilter === 'all'
        ? true
        : m.location.includes(locationFilter)
    )
    .filter(m =>
      levelFilter === 'all'
        ? true
        : m.level === levelFilter
    )
    .filter(m =>
      ectsFilter === 'all'
        ? true
        : m.studycredit === Number(ectsFilter)
    )
    .sort((a, b) => {
      if (sort === 'popular') return b.popularity_score - a.popularity_score;
      if (sort === 'az') return a.name.localeCompare(b.name);
      if (sort === 'za') return b.name.localeCompare(a.name);
      return 0;
    });
</script>

<div class="min-h-screen bg-(--color-bg) text-(--primary-color) font-(--font-primary)">
  <!-- Sticky filters -->
  <div class="sticky top-15 z-20 bg-(--color-bg) overflow-x-hidden">
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

  <!-- Content -->
  <div class="max-w-6xl mx-auto px-4 py-6 overflow-x-hidden">
    <p class="mb-4 font-bold">{filtered.length} {$translations.results}</p>
    <ModuleGrid modules={filtered} />
  </div>
</div>
