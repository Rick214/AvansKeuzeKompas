<script lang="ts">
	import { onMount } from 'svelte';
	import ModuleSection from '$lib/components/ui/HomePage/ModuleSection.svelte';

	import type { Module } from '$lib/types/vkm';
	import { user } from '$lib/stores/auth';
	import { translations } from '$lib/stores/userPreferences';
	import { vkms } from '$lib/stores/vkm';
	import { getUser } from '$lib/api/client/users';

	/* ----------------------------------
	 * State
	 * ---------------------------------- */

	let modules: Module[] = [];

	// SAFE fallback so reactive code never crashes
	$: safeUser = $user ?? {
		chosenVKMs: [],
		favoriteVKMs: [],
		aiRecommendedVKMs: []
	};

	/* ----------------------------------
	 * Data loading
	 * ---------------------------------- */
	$: modules = $vkms;

	/* ----------------------------------
	 * Helpers
	 * ---------------------------------- */

	type Section = {
		title: string;
		modules: Module[];
	};

	function byIds(ids: number[]): Module[] {
		return modules.filter((m) => ids.includes(m.id));
	}

	/* ----------------------------------
	 * Derived sections
	 * ---------------------------------- */

	$: sections = modules.length
		? ([
				{
					title: $translations.registered_title,
					modules: byIds(safeUser.chosenVKMs.map((m) => m.id))
				},
				{
					title: $translations.favorites_title,
					modules: byIds(safeUser.favoriteVKMs)
				},
				{
					title: $translations.recommended_title,
					modules: byIds(safeUser.aiRecommendedVKMs)
				},
				...Object.entries(
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
				}))
			] as Section[])
		: [];
</script>

<!-- ----------------------------------
	UI
----------------------------------- -->

<div class="bg-(--color-bg) min-h-screen p-4 space-y-4">
	<div class="mx-3">
		<h1 class="mt-15 text-2xl text-(--primary-color)">Home</h1>

		{#if sections.length === 0}
			<p class="mt-6 text-center text-(--primary-color)">
				{$translations.loading}
			</p>
		{:else}
			{#each sections as section}
				<ModuleSection {section} />
			{/each}
		{/if}
	</div>
</div>
