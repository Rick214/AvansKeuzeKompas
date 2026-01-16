<script lang="ts">
	import { goto } from '$app/navigation';

	export let module;

	function goToModulesFilter(key: string, value: string) {
		const params = new URLSearchParams();
		params.set(key, value);

		goto(`/modules?${params.toString()}`, {
			keepFocus: true,
			noScroll: true
		});
	}
</script>


<div class="flex flex-wrap justify-center gap-2 md:gap-6 flex-1 md:-ml-20">
	<!-- Location -->
	{#each module.location as loc}
		<button
			class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold hover:opacity-75 hover:scale-98 transition duration-200 cursor-pointer"
			on:click={() => goToModulesFilter('location', loc)}
		>
			{loc}
		</button>
	{/each}

	<!-- Themes -->
	{#each module.themes as theme}
		<button
			class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold hover:opacity-75 hover:scale-98 transition duration-200 cursor-pointer"
			on:click={() => goToModulesFilter('theme', theme)}
		>
			{theme}
		</button>
	{/each}

	<!-- ECTS -->
	<button
		class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold hover:opacity-75 hover:scale-98 transition duration-200 cursor-pointer"
		on:click={() => goToModulesFilter('ects', String(module.studycredit))}
	>
		{module.studycredit} ECTS
	</button>

	<!-- Level -->
	<button
		class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold hover:opacity-75 hover:scale-98 transition duration-200 cursor-pointer"
		on:click={() => goToModulesFilter('level', module.level)}
	>
		{module.level}
	</button>
</div>


