<script lang="ts">
	import type { Module } from '$lib/data/dummyModules';

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
					<a href={`/modules/${module.id}`} class="bg-[var(--color-surface-alt)] w-50 h-25 rounded-lg p-3 flex flex-col flex-shrink-0 snap-start hover:scale-[1.02] transition">
						<p class="mt-auto text-sm font-medium text-[var(--primary-color)]">
							{module.name}
						</p>
					</a>

					<button class="absolute top-2 right-2 z-10 p-1" on:click|stopPropagation={() => toggleFavorite(module.id)} aria-label="Toggle favoriet">
						<svg viewBox="0 0 24 24" class="w-5 h-5 transition" fill={favorites.has(module.id) ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.347a1 1 0 00.95.69h6.674c.969 0 1.371 1.24.588 1.81l-5.4 3.922a1 1 0 00-.364 1.118l2.062 6.347c.3.921-.755 1.688-1.54 1.118l-5.4-3.922a1 1 0 00-1.176 0l-5.4 3.922c-.784.57-1.838-.197-1.539-1.118l2.062-6.347a1 1 0 00-.364-1.118L.49 11.774c-.783-.57-.38-1.81.588-1.81h6.674a1 1 0 00.95-.69l2.062-6.347z"
							/>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
