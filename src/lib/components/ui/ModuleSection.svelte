<script lang="ts">
	import type { Module } from '$lib/data/dummyModules';

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

		const cardWidth =
			firstCard.offsetWidth +
			parseFloat(style.marginLeft) +
			parseFloat(style.marginRight) +
			gap;

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
			<button
				class="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white"
				on:click={() => scrollRow(-1)}
			>
				<span class="text-3xl leading-none relative -top-1">‹</span>
			</button>

			<button
				class="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white"
				on:click={() => scrollRow(1)}
			>
				<span class="text-3xl leading-none relative -top-1">›</span>
			</button>
		{/if}

		<div use:observe class="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
			{#each section.modules as module}
				<a href={`/home/${module.id}`} class="bg-[var(--color-surface-alt)] w-50 h-25 rounded-lg p-3 flex flex-col flex-shrink-0 snap-start hover:scale-[1.02] transition">
					<p class="mt-auto text-sm font-medium text-[var(--primary-color)]">
						{module.name}
					</p>
				</a>
			{/each}
		</div>
	</div>
</div>
