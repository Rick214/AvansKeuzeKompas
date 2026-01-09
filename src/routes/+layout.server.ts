import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/types/user';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const raw = cookies.get('user');

	if (!raw) {
		return { user: null };
	}

	try {
		return {
			user: JSON.parse(raw) as User
		};
	} catch {
		return { user: null };
	}
};
