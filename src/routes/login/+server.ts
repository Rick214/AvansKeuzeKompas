import { login } from '$lib/api/client/users';
import { json, type RequestEvent } from '@sveltejs/kit';

export const POST = async ({ request, cookies }: RequestEvent): Promise<Response> => {
	const { email, password } = await request.json();

	const { token, ...user } = await login(email, password);

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