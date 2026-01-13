import { json } from '@sveltejs/kit';
import { login } from '$lib/api/client/users';

export const POST = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	const { token, ...user } = await login(email, password);

	// Token stays HttpOnly
	cookies.set('auth', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24
	});

	return json({ user });
};
