<script lang="ts">
	import type { Module } from '$lib/types/vkm';

	let favorites = new Set<number>();

	function toggleFavorite(id: number) {
		if (favorites.has(id)) {
			favorites.delete(id);
		} else {
			favorites.add(id);
		}

		favorites = new Set(favorites);
	}

	export let section: {
		title: string;
		modules: Module[];
	};

	let row: HTMLDivElement;
	let hasOverflow = false;

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
			hasOverflow = node.scrollWidth > node.clientWidth;
		};

		check();

		const observer = new ResizeObserver(check);
		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div class="my-3">
	<h2 class="text-lg text-[var(--primary-color)] mb-1">
		{section.title}
	</h2>

	<div class="relative group">
		{#if hasOverflow}
			<button class="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white" on:click={() => scrollRow(-1)}>
				<span class="material-symbols-outlined"> chevron_backward </span>
			</button>

			<button class="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white" on:click={() => scrollRow(1)}>
				<span class="material-symbols-outlined"> chevron_forward </span>
			</button>
		{/if}

		<div use:observe class="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
			{#each section.modules as module}
				<div class="relative">
					<a href={`/modules/${module.id}?from=/home`} class="bg-(--color-surface-alt) w-50 h-26 md:w-60 md:h-32 rounded-lg p-3 flex flex-col flex-shrink-0 snap-start hover:scale-1.10 transition">
						<p class="mt-auto text-xs font-medium line-clamp-2 text-(--primary-color)">
							{module.name}
						</p>
					</a>

					<button class="absolute top-2 right-2 z-10 p-1" on:click|stopPropagation={() => toggleFavorite(module.id)} aria-label="Toggle favoriet">
						<i class="fa-{favorites.has(module.id) ? 'solid' : 'regular'} fa-star hover:scale-110"></i>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
