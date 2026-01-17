<script lang="ts">
	import { preferences } from '$lib/stores/userPreferences';

	export let module;

	type ThemeValue = 'medical' | 'biomedical' | 'psychology' | 'social' | 'business' | 'tech' | 'durable' | 'education' | 'research' | 'juridical' | 'international';

	const themeSectionsNL: Record<string, ThemeValue> = {
		'Medisch & Zorg': 'medical',
		'Biomedisch & Life Sciences': 'biomedical',
		'Psychologie & Gedrag': 'psychology',
		'Sociaal & Maatschappelijk': 'social',
		'Business, Finance & Economie': 'business',
		'Technologie & Digitalisering': 'tech',
		'Engineering & Techniek': 'tech',
		'Creatief & Media': 'social',
		'Ruimtelijke & Duurzame Ontwikkeling': 'durable',
		'Onderwijs & Pedagogiek': 'education',
		'Onderzoek & Innovatie': 'research',
		Juridisch: 'juridical',
		Internationaal: 'international',
		Duurzaamheid: 'durable'
	};

	const themeSectionsEN: Record<string, ThemeValue> = {
		'Medical & Healthcare': 'medical',
		'Biomedical & Life Sciences': 'biomedical',
		'Psychology & Behavior': 'psychology',
		'Social & Society': 'social',
		'Business, Finance & Economics': 'business',
		'Technology & Digitalization': 'tech',
		'Engineering & Technology': 'tech',
		'Creative & Media': 'social',
		'Spatial & Sustainable Development': 'durable',
		'Education & Pedagogy': 'education',
		'Research & Innovation': 'research',
		Legal: 'juridical',
		International: 'international',
		Sustainability: 'durable'
	};

	const imagesPerTheme: Record<ThemeValue | 'default', number> = {
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

	let themeSections: Record<string, ThemeValue> = {};
	$: themeSections = $preferences.language === 'nl_NL' ? themeSectionsNL : themeSectionsEN;

	let imageTheme: ThemeValue | 'default' = 'default';
	$: {
		const raw = module?.themes?.[0] ?? '';
		imageTheme = themeSectionsNL[raw] ?? themeSectionsEN[raw] ?? 'default';
	}

	let currentImage: string = '';
	function pickRandomImage(theme: ThemeValue | 'default') {
		const count = imagesPerTheme[theme];
		const randomIndex = Math.floor(Math.random() * count) + 1;
		return `/images/${theme}/${theme}-${randomIndex}.jpg`;
	}

	let lastTheme: ThemeValue | 'default';

	$: if (imageTheme !== lastTheme) {
		lastTheme = imageTheme;
		currentImage = pickRandomImage(imageTheme);
	}
</script>

<img src={currentImage} alt={module?.name ?? ''} decoding="async" class="absolute inset-0 w-full h-full object-cover" />
