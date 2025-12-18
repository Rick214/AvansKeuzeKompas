<script lang="ts">
	//module dummy data
	import { dummyModules } from '$lib/data/dummyModules';
	import { dummyUser } from '$lib/data/dummyUsers';
	import type { Module } from '$lib/data/dummyModules';
	import { translations } from '$lib/stores/userPreferences';

	type Section = {
		title: string;
		modules: Module[];
	};

	const modules = dummyModules;
	const user = dummyUser;

	function byIds(ids: number[]) {
		return modules.filter((m) => ids.includes(m.id));
	}

	$: sections = [
		{
			title: $translations.registered_title,
			modules: byIds(user.registered_modules)
		},
		{
			title: $translations.favorites_title,
			modules: byIds(user.favorite_modules)
		},
		{
			title: $translations.recommended_title,
			modules: byIds(user.recommended_modules)
		},
		...Object.entries(
			modules.reduce<Record<string, Module[]>>((acc, module) => {
				module.theme_tags.forEach((tag) => {
					acc[tag] ??= [];
					acc[tag].push(module);
				});
				return acc;
			}, {})
		).map(([tag, modules]) => ({
			title: tag,
			modules
		}))
	].filter((section) => section.modules.length > 0);

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

				<div class="relative group">
					{#if hasOverflow[index]}
						<button
							class="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white"
							on:click={() => scrollRow(index, -1)}
						>
							<span class="text-3xl leading-none relative -top-1">‹</span>
						</button>

						<button
							class="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white"
							on:click={() => scrollRow(index, 1)}
						>
							<span class="text-3xl leading-none relative -top-1">›</span>
						</button>
					{/if}

					<div use:observeRow={index} class="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
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
		{/each}
	</div>
</div>
