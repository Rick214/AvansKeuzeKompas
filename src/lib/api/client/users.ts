import type { UserDto } from '../dto/user.dto';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function Login(email: string, password: string): Promise<UserDto> {
	const res = await fetch(`${API_URL}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!res.ok) {
		let error = 'unknown';
		try {
			const data = await res.json();
			error = data.error ?? error;
		} catch {
			// JSON parse errors negeren
		}
		throw new Error(error);
	}

	const data: UserDto = await res.json();
	console.log(data)
	return data;
}