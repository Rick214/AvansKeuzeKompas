<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';
	import VkmImage from '../VkmImage.svelte';
	export let module;
	const MAX_RATING = 5;

	$: filledDots = Math.min(MAX_RATING, Math.round(module.popularity_score / 100));
</script>

<div class="relative w-full bg-(--color-surface) px-6 md:px-10 py-5 pt-30 md:pt-45 flex items-end justify-between overflow-hidden">
	<VkmImage {module} />
	<div class="absolute inset-0 w-full h-full bg-black opacity-50 z-1"></div>
	<h1 class="font-(--font-heading) text-lg md:text-2xl z-2 text-white">
		{module.name}
	</h1>

	<div class="flex items-center gap-3 z-2">
		<span class="hidden lg:inline text-sm font-bold text-white">
			{$translations.rating}
		</span>
		{#each Array(MAX_RATING) as _, i}
			<span
				class="w-4 h-4 md:w-6 md:h-6 rounded-full
        {i < filledDots ? 'bg-(--color-accent)' : 'bg-(--color-surface-alt)'}"
			></span>
		{/each}
	</div>
</div>
