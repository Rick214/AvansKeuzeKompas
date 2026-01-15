import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const id = Number(params.id);

	if (Number.isNaN(id)) {
		throw error(404, 'Module not found');
	}

	return {
		id: Number(params.id)
	};
};
