export type Module = {
	id: number;
	name: string;
	shortdescription: string;
	description: string;
	content: string;
	studycredit: number;
	location: string;
	contact_id: number;
	level: string;
	learningoutcomes: string;
	module_tags: string[];
	interests_match_score: number;
	popularity_score: number;
	estimated_difficulty: number;
	available_spots: number;
	start_date: string;
	theme_tags: string[];
};

export const dummyModules: Module[] = [
	{
		id: 1,
		name: 'Introduction to Svelte',
		shortdescription: 'Learn the fundamentals of Svelte',
		description: 'Full introduction to Svelte framework.',
		content: '',
		studycredit: 5,
		location: 'Online',
		contact_id: 1,
		level: 'Beginner',
		learningoutcomes: 'Components, reactivity, stores',
		module_tags: ['frontend'],
		interests_match_score: 0.91,
		popularity_score: 88,
		estimated_difficulty: 2,
		available_spots: 12,
		start_date: '2025-03-01',
		theme_tags: ['Frontend', 'Svelte']
	},
	{
		id: 2,
		name: 'Advanced TypeScript',
		shortdescription: 'Deep dive into TypeScript',
		description: 'Advanced typing and architecture.',
		content: '',
		studycredit: 6,
		location: 'Campus',
		contact_id: 2,
		level: 'Advanced',
		learningoutcomes: 'Generics, utility types, patterns',
		module_tags: ['typescript'],
		interests_match_score: 0.78,
		popularity_score: 74,
		estimated_difficulty: 4,
		available_spots: 6,
		start_date: '2025-04-10',
		theme_tags: ['Programming', 'TypeScript']
	},
	{
		id: 3,
		name: 'API Design Basics',
		shortdescription: 'Design clean APIs',
		description: '',
		content: '',
		studycredit: 4,
		location: 'Online',
		contact_id: 3,
		level: 'Intermediate',
		learningoutcomes: 'REST, GraphQL',
		module_tags: ['backend'],
		interests_match_score: 0.85,
		popularity_score: 65,
		estimated_difficulty: 3,
		available_spots: 0,
		start_date: '2025-02-15',
		theme_tags: ['Backend', 'Architecture']
	},
	{
		id: 4,
		name: 'UI/UX Fundamentals',
		shortdescription: 'User-centered design',
		description: '',
		content: '',
		studycredit: 3,
		location: 'Campus',
		contact_id: 4,
		level: 'Beginner',
		learningoutcomes: 'UX research, wireframing',
		module_tags: ['design'],
		interests_match_score: 0.67,
		popularity_score: 92,
		estimated_difficulty: 1,
		available_spots: 18,
		start_date: '2025-05-01',
		theme_tags: ['Design']
	},
	{
		id: 5,
		name: 'Data Science with Python',
		shortdescription: 'Analyze data with Python',
		description: '',
		content: '',
		studycredit: 6,
		location: 'Online',
		contact_id: 5,
		level: 'Intermediate',
		learningoutcomes: 'Pandas, NumPy, visualization',
		module_tags: ['data'],
		interests_match_score: 0.88,
		popularity_score: 81,
		estimated_difficulty: 3,
		available_spots: 10,
		start_date: '2025-06-10',
		theme_tags: ['Data', 'Python']
	}
];
