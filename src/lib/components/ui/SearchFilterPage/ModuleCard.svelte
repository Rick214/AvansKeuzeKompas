<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';
	import { goto } from '$app/navigation';
	import type { Module } from '$lib/types/vkm';
	export let module: Module;
 	import { page } from '$app/stores';
	import { user } from '$lib/stores/auth';
	import { Favorites } from '$lib/api/client/favorites';
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
			await Favorites(id)
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

  	const themeSections = {
		"Psychologie & Gedrag": "psychology",
		"Sociaal & Maatschappelijk": "social",
		"Medisch & Zorg": "medical",
		"Ruimtelijke & Duurzame Ontwikkeling": "durable",
		"Business, Finance & Economie": "business",
		"Juridisch": "juridical",
		"Technologie & Digitalisering": "tech",
		"Engineering & Techniek": "tech",
		"Biomedisch & Life Sciences": "biomedical",
		"Onderwijs & Pedagogiek": "education",
		"Onderzoek & innovatie": "research", 
		"Internationaal": "international",
		"Duurzaamheid": "durable",
		"Creatief & Media": "social",
	} as const;

	type ThemeSectionKey = keyof typeof themeSections;

	const imagesPerTheme: Record<string, number> = {
		psychology: 2,
		social: 4,
		medical: 2,
		durable: 4,
		business: 2,
		juridical: 2,
		tech: 4,
		biomedical: 2,
		education: 2,
		research: 3,
		international: 2,
		default: 1
	};

	const title = (module?.themes?.[0] ?? '') as ThemeSectionKey;
	const imageTheme = themeSections[title] || 'default';

	function chooseImage(): string {
		// Pick a random image for the theme
		const count = imagesPerTheme[imageTheme] || 1;
		const randomIndex = Math.floor(Math.random() * count) + 1;

		// Returns the image path
		return `/images/${imageTheme}/${imageTheme}-${randomIndex}.jpg`; // Must be a .jpg file
	}
</script>
<div class="bg-(--color-surface-alt) rounded-xl p-4 flex gap-4 items-stretch shadow-lg">
	<!-- Image -->
	<div class="relative w-[120px] h-[120px] flex-none rounded-lg overflow-hidden">
		<img src={chooseImage()}  alt={module.name} class="absolute inset-0 w-full h-full object-cover" />
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
