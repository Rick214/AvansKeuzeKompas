<script lang="ts">
	import ModuleSection from '$lib/components/ui/ModuleSection.svelte';

	import { dummyModules } from '$lib/data/dummyModules';
	import { dummyUser } from '$lib/data/dummyUsers';
	import type { Module } from '$lib/data/dummyModules';
	import { translations } from '$lib/stores/userPreferences';

	type Section = {
		title: string;
		modules: Module[];
	};

	const modules = dummyModules;
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
				module.theme_tags.forEach((tag) => {
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

<div class="bg-[var(--color-bg)] min-h-screen p-4 space-y-4">
	<div class="mx-3">
		<h1 class="mt-10 text-xl text-[var(--primary-color)]">Home</h1>

		{#each sections as section}
			<ModuleSection {section} />
		{/each}
	</div>
</div>
