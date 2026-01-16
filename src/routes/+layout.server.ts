import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { wakeAiModel } from '$lib/api/client/ai';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (url.pathname.startsWith('/login') || url.pathname.startsWith('/auth') || url.pathname === '/') {
		return {};
	}

	if (!locals.user) {
		throw redirect(303, '/auth/redirect');
	}

	return {};
};
