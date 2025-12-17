<script lang="ts">
	import { translations } from "$lib/stores/userPreferences";
	type Section = {
		title: string;
		count: number;
	};

	//themes and amount of modules
	// Reactive subscription to translations
	$: sections = [
		{ title: $translations.registered_title, count: 3 },
		{ title: $translations.favorites_title, count: 20 },
		{ title: $translations.recommended_title, count: 5 },
		{ title: 'Module tags', count: 5 }
	];
	let rows: HTMLDivElement[] = [];
	let hasOverflow: boolean[] = [];

	function scrollRow(index: number, direction: number) {
		const container = rows[index];
		if (!container) return;

		const firstCard = container.children[0] as HTMLElement;
		if (!firstCard) return;

		const cardStyle = getComputedStyle(firstCard);
		const gap = parseFloat(getComputedStyle(container).columnGap || '0');

		const cardWidth = firstCard.offsetWidth + parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight) + gap;

		// How many full cards fit in the viewport
		const cardsPerPage = Math.floor(container.clientWidth / cardWidth);

		// Always scroll at least 1 card
		const scrollAmount = Math.max(cardsPerPage, 1) * cardWidth;

		container.scrollBy({
			left: direction * scrollAmount,
			behavior: 'smooth'
		});
	}

	function observeRow(node: HTMLDivElement, index: number) {
		rows[index] = node;

		const checkOverflow = () => {
			hasOverflow[index] = node.scrollWidth > node.clientWidth;
		};

		checkOverflow();

		const observer = new ResizeObserver(checkOverflow);
		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div class="bg-[var(--color-bg)] min-h-screen p-4 space-y-4">
	<div class="mx-3">
		<h1 class="mt-10 text-xl text-[var(--primary-color)]">Home</h1>

		{#each sections as section, index}
			<div class="my-3">
				<h2 class="text-lg text-[var(--primary-color)] mb-1">
					{section.title}
				</h2>

				<!-- ROW -->
				<div class="relative group">
					{#if hasOverflow[index]}
						<!-- LEFT ARROW -->
						<button
							class="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white"
							on:click={() => scrollRow(index, -1)}
						>
							<span class="text-3xl leading-none relative -top-1">‹</span>
						</button>

						<!-- RIGHT ARROW -->
						<button
							class="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white"
							on:click={() => scrollRow(index, 1)}
						>
							<span class="text-3xl leading-none relative -top-1">›</span>
						</button>
					{/if}

					<!-- SCROLL CONTAINER -->
					<div use:observeRow={index} class="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
						{#each Array(section.count) as _}
							<div class="bg-[var(--color-surface-alt)] w-50 h-25 rounded-lg p-2 flex flex-col flex-shrink-0">
								<p class="mt-auto text-xs text-[var(--primary-color)]">Module Title</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
