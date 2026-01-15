<script lang="ts">
  import { translations } from '$lib/stores/userPreferences';
  export let module;
  const MAX_RATING = 5;

  $: filledDots = Math.min(
    MAX_RATING,
    Math.round(module.popularity_score / 100)
  );

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

<div
  class="relative w-full bg-(--color-surface) px-6 md:px-10 py-5 pt-30 md:pt-45 flex items-end justify-between overflow-hidden">
	<img src={chooseImage()}  alt={module.name} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 w-full h-full bg-black opacity-50 z-1"></div>
  <h1 class="font-(--font-heading) text-lg md:text-2xl z-2 text-white">
    {module.name}
  </h1>

  <div class="flex items-center gap-3 z-2">
    <span class="hidden lg:inline text-sm font-bold">
      {$translations.rating}
    </span>
    {#each Array(MAX_RATING) as _, i}
      <span
        class="w-4 h-4 md:w-6 md:h-6 rounded-full
        {i < filledDots
          ? 'bg-(--color-accent)'
          : 'bg-(--color-surface-alt)'}"
      ></span>
    {/each}
  </div>
</div>
