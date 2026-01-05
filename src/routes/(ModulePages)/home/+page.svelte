<script lang="ts">
	import ModuleSection from '$lib/components/ui/HomePage/ModuleSection.svelte';
  	import { getModules } from '$lib/api/client/vkms';
  	import type { Module } from '$lib/types/vkm';
	import { dummyUser } from '$lib/data/dummyUsers';
	import { translations } from '$lib/stores/userPreferences';
	import type { PageData } from './$types';

	export let data: PageData;

	type Section = {
		title: string;
		modules: Module[];
	};

	let modules: Module[] = data.modules;
	const user = dummyUser;

	function byIds(ids: number[]) {
		return modules.filter((m) => ids.includes(m.id));
	}

	$: sections = [
		{
			title: $translations.registered_title,
			modules: byIds(user.registered_modules)
		},
		{
			title: $translations.favorites_title,
			modules: byIds(user.favorite_modules)
		},
		{
			title: $translations.recommended_title,
			modules: byIds(user.recommended_modules)
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

<div class="bg-(--color-bg)] min-h-screen p-4 space-y-4">
	<div class="mx-3">
		<h1 class="mt-10 text-xl text-(--primary-color)]">Home</h1>

		{#each sections as section}
			<ModuleSection {section} />
		{/each}
	</div>
</div>
