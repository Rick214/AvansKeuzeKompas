<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import SearchAndFilters from '$lib/components/ui/SearchFilterPage/SearchAndFilters.svelte';
	import ModuleGrid from '$lib/components/ui/SearchFilterPage/ModuleGrid.svelte';

	import type { Module } from '$lib/types/vkm';
	import { translations } from '$lib/stores/userPreferences';
	import { vkms } from '$lib/stores/vkm';

	// modules from load()
	let modules: Module[] = $vkms;

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
	function dedupeModules(modules: Module[]): Module[] {
		const seen = new Set<string>();
		return modules.filter((m) => {
			const name = String(m.name).trim();
			if (seen.has(name)) return false;
			seen.add(name);
			return true;
		});
	}
	// ───────────────────────────────────────
	// FILTER MODULES
	// ───────────────────────────────────────
	$: filtered = dedupeModules(
		modules
			.map((m) => {
				let score = 0;
				const q = search.toLowerCase();

				if (q.length >= 3) {
					if (m.name.toLowerCase().includes(q)) score += 10;
					if (m.tags?.some((tag) => tag.toLowerCase().includes(q))) score += 5;
					if (m.description?.toLowerCase().includes(q)) score += 3;
					if (m.learningoutcomes?.toLowerCase().includes(q)) score += 2;
				} else {
					score = 1;
				}

				return { module: m, score };
			})
			.filter(
				({ module, score }) =>
					score > 0 &&
					(locationFilter === 'all' ? true : module.location.includes(locationFilter)) &&
					(levelFilter === 'all' ? true : module.level === levelFilter) &&
					(ectsFilter === 'all' ? true : module.studycredit === Number(ectsFilter))
			)
			.sort((a, b) => {
				if (search.length >= 3) return b.score - a.score;
				if (sort === 'popular') return b.module.popularity_score - a.module.popularity_score;
				if (sort === 'az') return a.module.name.localeCompare(b.module.name);
				if (sort === 'za') return b.module.name.localeCompare(a.module.name);
				return 0;
			})
			.map(({ module }) => module)
	);
</script>

<div class="min-h-screen bg-(--color-bg) text-(--primary-color) font-(--font-primary)">
	<!-- Sticky filters -->
	<div class="sticky top-15 z-20 bg-(--color-bg) overflow-x-hidden">
		<SearchAndFilters {search} {locationFilter} {levelFilter} {ectsFilter} {sort} onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />
	</div>

	<!-- Content -->
	<div class="max-w-6xl mx-auto px-4 py-6 overflow-x-hidden">
		<p class="mb-4 font-bold">{filtered.length} {$translations.results}</p>
		<ModuleGrid modules={filtered} />
	</div>
</div>
