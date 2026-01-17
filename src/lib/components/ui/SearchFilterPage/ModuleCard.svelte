<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';
	import { goto } from '$app/navigation';
	import type { Module } from '$lib/types/vkm';
	export let module: Module;
 	import { page } from '$app/stores';
	import { user } from '$lib/stores/auth';
	import VkmImage from '../VkmImage.svelte';
	$: favoriteSet = new Set($user.favoriteVKMs);

	let toggling = new Set<number>();

	async function toggleFavorite(id: number) {
		if (toggling.has(id)) return;

		toggling.add(id);
		toggling = new Set(toggling);

		const isFavorite = favoriteSet.has(id);

		// Optimistic update
		$user.favoriteVKMs = isFavorite
			? $user.favoriteVKMs.filter(v => v !== id)
			: [...$user.favoriteVKMs, id];

		try {
			// Toggle favorite vkm
			const res = await fetch(`/modules?id=${id}`, {
				method: 'POST',
			});

			if (!res.ok) {
				const { error } = await res.json();
				throw new Error(error ?? 'unknown');
			}
		} catch (err) {
			console.error('Failed to toggle favorite', err);

			$user.favoriteVKMs = isFavorite
				? [...$user.favoriteVKMs, id]
				: $user.favoriteVKMs.filter(v => v !== id);
		} finally {
			toggling.delete(id);
			toggling = new Set(toggling);
		}
	}

	function goToDetails() {
  		const currentUrl =
    	$page.url.pathname + '?' + $page.url.searchParams.toString();

  		goto(`/modules/${module.id}?from=${encodeURIComponent(currentUrl)}`);
	}
</script>
<div class="module-card bg-(--color-surface-alt) rounded-xl p-4 flex gap-4 items-stretch shadow-lg">
	<!-- Image -->
	<div class="relative w-[120px] h-[120px] flex-none rounded-lg overflow-hidden">
		<VkmImage { module }/>
		<div class="absolute inset-0 w-full h-full bg-black opacity-50 z-1"></div>
		<button on:click|stopPropagation={() => toggleFavorite(module.id)} aria-label="Toggle favoriet" class="absolute right-0 z-2">
			<i class="fa-{favoriteSet.has(module.id) ? 'solid' : 'regular'} fa-star hover:scale-110 text-white p-2"></i>
		</button>
	</div>

	<!-- Content -->
	<div class="flex flex-col justify-between flex-1 min-w-0">
		<div>
			<h3 class="font-bold line-clamp-2 break-words [overflow-wrap:anywhere]">{module.name}</h3>
			<p class="text-sm line-clamp-2 break-words [overflow-wrap:anywhere] text-(--color-text)">
				{module.themes}
			</p>
		</div>

		<button class="self-start px-4 py-1 rounded-full bg-(--color-accent) text-black text-sm font-bold" on:click={goToDetails}>
			{$translations.view_text}
		</button>
	</div>
</div>
