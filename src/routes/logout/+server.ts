import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('auth', {
		path: '/'
		// domain: 'yourdomain.com'  // only if you set it originally
	});

	throw redirect(303, '/login');
};
