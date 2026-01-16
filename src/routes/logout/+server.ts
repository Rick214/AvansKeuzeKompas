import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }): Promise<Response> => {
	cookies.delete('auth', {
		path: '/'
	});

	throw redirect(303, '/login');
};
