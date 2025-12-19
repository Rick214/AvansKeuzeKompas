<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';
	import { goto } from '$app/navigation';
	import type { Module } from '$lib/data/dummyModules';
	export let module: Module;
</script>

<div class="bg-(--color-surface-alt) rounded-xl p-4 flex gap-4 items-stretch">
	<!-- Image -->
	<div class="w-[120px] h-[120px] flex-none rounded-lg bg-black"></div>

	<!-- Content -->
	<div class="flex flex-col justify-between flex-1">
		<div>
			<h3 class="font-bold">{module.name}</h3>
			<p class="text-sm text-(--color-text)">
				{module.shortdescription}
			</p>
		</div>

		<button class="self-start px-4 py-1 rounded-full bg-(--color-accent) text-black text-sm font-bold" on:click={() => goto(`/modules/${module.id}`)}>
			{$translations.view_text}
		</button>
	</div>
</div>
