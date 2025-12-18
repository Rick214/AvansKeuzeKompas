<script lang="ts">
	export let module;
	import { translations } from '$lib/stores/userPreferences';
</script>

<div class="w-full bg-(--color-surface-alt) px-6 md:px-10 py-5 pt-15 md:pt-25 flex items-end justify-between">
	<h1 class="font-(--font-heading) text-lg md:text-2xl font-bold">{module.name}</h1>

	<div class="flex items-center gap-3">
		<span class="hidden lg:inline text-sm font-bold">{$translations.rating}</span>
		{#each Array(5) as _, i}
			<span class="w-6 h-6 rounded-full bg-(--color-{i < 4 ? 'accent' : 'surface'})"></span>
		{/each}
	</div>
</div>
