import { login } from '$lib/api/client/users';
import { json, type RequestEvent } from '@sveltejs/kit';

export const POST = async ({ request, cookies }: RequestEvent): Promise<Response> => {
	const { email, password } = await request.json();

	const { token, ...user } = await login(email, password);

	const API_KEY = '9f8b7c6d5e4a3b2c1d0f9e8d7c6b5a4f';
	
	// Token stays HttpOnly
	cookies.set('auth', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		path: '/',
		maxAge: 60 * 60 * 24
	});

	return json({ user });
};
