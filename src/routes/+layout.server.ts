import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (url.pathname.startsWith('/login') || url.pathname.startsWith('/auth')) {
		return {};
	}

	if (!locals.user) {
		throw redirect(303, '/auth/redirect');
	}

	return {};
};
