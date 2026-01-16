import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types/user';

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
	throw new Error('VITE_API_URL environment variable is not set');
}

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth');

	if (!token) {
		event.locals.user = null;
		return resolve(event);
	}

	try {
		const res = await fetch(`${API_BASE}/user/getUserInfo`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (!res.ok) {
			throw new Error('Invalid token');
		}

		const user: User = await res.json();
		event.locals.user = user;
	} catch (err) {
		// token invalid or backend down
		event.cookies.delete('auth', { path: '/' });
		event.locals.user = null;
	}

	return resolve(event);
};
