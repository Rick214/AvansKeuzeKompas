<script lang="ts">
	import ModuleSection from '$lib/components/ui/HomePage/ModuleSection.svelte';
  	import type { Module } from '$lib/types/vkm';
	import { user } from '$lib/stores/auth';
	import { translations } from '$lib/stores/userPreferences';
	import type { PageData } from './$types';

	export let data: PageData;

	type Sections = {
		title: string;
		modules: Module[];
	};

	let modules: Module[] = data.modules;
	console.log($user)
	function byIds(ids: number[]) {
	return modules.filter((m) => ids.includes(m.id));
	}

	$: sections = [
		{
			title: $translations.registered_title,
			modules: byIds(($user.enrolledVKMs ?? [])
						.map(m => m.id))
		},
		{
			title: $translations.favorites_title,
			modules: byIds($user.favoriteVKMs ?? [])
		},
		{
			title: $translations.recommended_title,
			modules: byIds($user.aiRecomendedVKMs ?? [])
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
	].filter((section) => section.modules.length > 0);
</script>

<div class="bg-(--color-bg) min-h-screen p-4 space-y-4">
	<div class="mx-3">
		<h1 class="mt-15 text-2xl text-(--primary-color)">Home</h1>

		{#each sections as section}
			<ModuleSection {section} />
		{/each}
	</div>
</div>
