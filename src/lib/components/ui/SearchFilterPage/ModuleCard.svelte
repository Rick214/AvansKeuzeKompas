<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';
	import { goto } from '$app/navigation';
	import type { Module } from '$lib/types/vkm';
	export let module: Module;
 	import { page } from '$app/stores';
	let favorites = new Set<number>();

	function toggleFavorite(id: number) {
		if (favorites.has(id)) {
			favorites.delete(id);
		} else {
			favorites.add(id);
		}

		favorites = new Set(favorites);
	}
	function goToDetails() {
  		const currentUrl =
    	$page.url.pathname + '?' + $page.url.searchParams.toString();

  		goto(`/modules/${module.id}?from=${encodeURIComponent(currentUrl)}`);
}
</script>
<div class="bg-(--color-surface-alt) rounded-xl p-4 flex gap-4 items-stretch">
	<!-- Image -->
	<div class="w-[120px] h-[120px] flex-none rounded-lg bg-black">
		<button on:click|stopPropagation={() => toggleFavorite(module.id)} aria-label="Toggle favoriet">
			<i class="fa-{favorites.has(module.id) ? 'solid' : 'regular'} fa-star hover:scale-110 text-white p-2"></i>
		</button>
	</div>

	<!-- Content -->
	<div class="flex flex-col justify-between flex-1 min-w-0">
		<div>
			<h3 class="font-bold line-clamp-2 break-words [overflow-wrap:anywhere] hyphens-auto">{module.name}</h3>
			<p class="text-sm line-clamp-2 break-words [overflow-wrap:anywhere] text-(--color-text)">
				{module.themes}
			</p>
		</div>

		<button class="self-start px-4 py-1 rounded-full bg-(--color-accent) text-black text-sm font-bold" on:click={goToDetails}>
			{$translations.view_text}
		</button>
	</div>
</div>
