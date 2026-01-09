import { json } from '@sveltejs/kit';
import { Login } from '$lib/api/client/users';

export const POST = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	const { Token, ...user } = await Login(email, password);

	// Token stays HttpOnly
	cookies.set('auth', Token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24
	});

	// User data (readable by server only)
	cookies.set('user', JSON.stringify(user), {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24
	});

	return json({ user });
};
