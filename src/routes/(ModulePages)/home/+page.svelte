<script lang="ts">
	import ModuleSection from '$lib/components/ui/HomePage/ModuleSection.svelte';

	import type { Module } from '$lib/types/vkm';
	import { user } from '$lib/stores/auth';
	import { translations } from '$lib/stores/userPreferences';
	import { vkms } from '$lib/stores/vkm';

	let modules: Module[] = [];

	// SAFE fallback so reactive code never crashes
	$: safeUser = $user ?? {
		chosenVKMs: [],
		favoriteVKMs: [],
		aiRecommendedVKMs: []
	};

	$: modules = $vkms ?? [];

	type Section = {
		title: string;
		modules: Module[];
	};

	function byIds(ids: number[]): Module[] {
		return modules.filter((m) => ids.includes(m.id));
	}
	$: sections = modules.length
		? (() => {
				const sections: Section[] = [];

				const registered = byIds(safeUser.chosenVKMs.map((m) => m.id));
				if (registered.length) {
					sections.push({
						title: $translations.registered_title,
						modules: registered
					});
				}

				const favorites = byIds(safeUser.favoriteVKMs);
				if (favorites.length) {
					sections.push({
						title: $translations.favorites_title,
						modules: favorites
					});
				}

				const recommended = byIds(safeUser.aiRecommendedVKMs);
				if (recommended.length) {
					sections.push({
						title: $translations.recommended_title,
						modules: recommended
					});
				}

				const byTheme = Object.entries(
					modules.reduce<Record<string, Module[]>>((acc, module) => {
						module.themes.forEach((tag) => {
							acc[tag] ??= [];
							acc[tag].push(module);
						});
						return acc;
					}, {})
				).map(([tag, modules]) => ({
					title: tag,
					modules
				}));

				return [...sections, ...byTheme];
			})()
		: [];
</script>

<div class="bg-(--color-bg) min-h-screen p-4 space-y-4">
	<div class="mx-3">
		<h1 class="mt-15 text-2xl text-(--primary-color)">Home</h1>
		{#each sections as section}
			<ModuleSection {section} />
		{/each}
	</div>
</div>
