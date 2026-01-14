const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type ApiOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: any;
	headers?: Record<string, string>;
};

export async function apiClient<T>(url: string, options: ApiOptions = {}): Promise<T> {
	try {
		const res = await fetch(`${API_URL}${url}`, {
			method: options.method ?? 'GET',
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			},
			credentials: 'include',
			body: options.body ? JSON.stringify(options.body) : undefined
		});

		let data: any = null;
		try {
			data = await res.json();
		} catch {
			// response has no JSON body
		}

		if (!res.ok) {
			throw new Error(data?.error ?? `Request failed with ${res.status}`);
		}

		return data as T;
	} catch (err) {
		// normalize thrown errors
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Request failed');
	}
}
