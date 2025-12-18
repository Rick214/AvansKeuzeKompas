import { dummyModules } from '$lib/data/dummyModules';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const id = Number(params.id);

	const module = dummyModules.find((m) => m.id === id);

	if (!module) {
		throw new Error('Module not found');
	}

	return {
		module
	};
};
