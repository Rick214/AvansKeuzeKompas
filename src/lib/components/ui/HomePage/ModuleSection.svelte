<script lang="ts">
	import type { Module } from '$lib/types/vkm';
	import { user } from '$lib/stores/auth';
	import { Favorites } from '$lib/api/client/favorites';
	import VkmImage from '../VkmImage.svelte';

	$: favoriteSet = new Set($user.favoriteVKMs);

	let toggling = new Set<number>();

	async function toggleFavorite(id: number) {
		if (toggling.has(id)) return;

		toggling.add(id);
		toggling = new Set(toggling);

		const isFavorite = favoriteSet.has(id);

		// Optimistic update
		$user.favoriteVKMs = isFavorite ? $user.favoriteVKMs.filter((v) => v !== id) : [...$user.favoriteVKMs, id];

		try {
			// Toggle favorite vkm
			const res = await fetch(`/modules?id=${id}`, {
				method: 'POST'
			});

			if (!res.ok) {
				const { error } = await res.json();
				throw new Error(error ?? 'unknown');
			}
		} catch (err) {
			console.error('Failed to toggle favorite', err);

			$user.favoriteVKMs = isFavorite ? [...$user.favoriteVKMs, id] : $user.favoriteVKMs.filter((v) => v !== id);
		} finally {
			toggling.delete(id);
			toggling = new Set(toggling);
		}
	}

	export let section: {
		title: string;
		modules: Module[];
	};

	let row: HTMLDivElement;
	let hasOverflow = false;

	let canScrollLeft = false;
	let canScrollRight = false;

	function updateScrollState() {
		if (!row) return;

		canScrollLeft = row.scrollLeft > 0;
		canScrollRight = row.scrollLeft + row.clientWidth < row.scrollWidth - 1;
	}

	function scrollRow(direction: number) {
		if (!row) return;

		const firstCard = row.children[0] as HTMLElement;
		if (!firstCard) return;

		const style = getComputedStyle(firstCard);
		const gap = parseFloat(getComputedStyle(row).columnGap || '0');

		const cardWidth = firstCard.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + gap;

		const cardsPerPage = Math.floor(row.clientWidth / cardWidth);
		const scrollAmount = Math.max(cardsPerPage, 1) * cardWidth;

		row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
	}

	function observe(node: HTMLDivElement) {
		row = node;

		const check = () => {
			updateScrollState();
		};

		check();

		node.addEventListener('scroll', check);

		const observer = new ResizeObserver(check);
		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
				node.removeEventListener('scroll', check);
			}
		};
	}
</script>

<div class="my-3">
	<h2 class="text-lg text-(--primary-color) mb-1">
		{section.title}
	</h2>

	<div class="relative group">
		{#if canScrollLeft}
			<button class="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white" on:click={() => scrollRow(-1)}>
				<span class="material-symbols-outlined"> chevron_backward </span>
			</button>
		{/if}

		{#if canScrollRight}
			<button class="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white" on:click={() => scrollRow(1)}>
				<span class="material-symbols-outlined"> chevron_forward </span>
			</button>
		{/if}

		<div use:observe class="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
			{#each section.modules as module}
				<div class="relative shadow-md">
					<a
						href={`/modules/${module.id}?from=/home`}
						class="relative bg-(--color-surface-alt) w-50 h-26 md:w-60 md:h-32 rounded-lg p-3 flex flex-col shrink-0 snap-start hover:scale-98 transition overflow-hidden"
					>
						<VkmImage {module} />
						<div class="absolute inset-0 w-full h-full bg-black opacity-50 z-1 hover:opacity-25 transition duration-200"></div>
						<p class="mt-auto text-sm font-medium line-clamp-2 text-white z-3">
							{module.name}
						</p>
					</a>

					<button class="absolute top-2 right-2 z-10 p-1" disabled={toggling.has(module.id)} on:click|stopPropagation={() => toggleFavorite(module.id)} aria-label="Toggle favorite">
						<i
							class="fa-{favoriteSet.has(module.id) ? 'solid' : 'regular'} fa-star hover:scale-110 text-white
							{toggling.has(module.id) ? 'opacity-50' : ''}"
						></i>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
