import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/types/user';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const raw = cookies.get('user');
	const token = cookies.get('auth');

	if (!raw) {
		return { user: null };
	}

	if (!token) {
		return { token: null };
	}

	try {
		return {
			user: JSON.parse(raw) as User,
			token: token
		};
	} catch {
		return { user: null, token: null };
	}
};
