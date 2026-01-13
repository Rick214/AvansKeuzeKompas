import { getToken } from '../services/token.service';
import { isAuthorized } from '../services/auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type ApiOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: any;
	headers?: Record<string, string>;
	retries?: number; // number of retries
	retryDelay?: number; // base delay in ms
};

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiClient<T>(url: string, options: ApiOptions = {}): Promise<T> {
	const { retries = 3, retryDelay = 500, ...fetchOptions } = options;

	let lastError: unknown;

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			const res = await fetch(`${API_URL}${url}`, {
				method: fetchOptions.method ?? 'GET',
				headers: {
					'Content-Type': 'application/json',
					...fetchOptions.headers
				},
				credentials: 'include',
				body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : undefined
			});

			let data: any = null;
			try {
				data = await res.json();
			} catch {
				// ignore JSON parse errors
			}

			if (!res.ok) {
				throw new Error(data?.error ?? `Request failed with ${res.status}`);
			}

			return data as T;
		} catch (err) {
			lastError = err;

			// stop retrying if this was the last attempt
			if (attempt === retries) {
				break;
			}

			// exponential backoff
			const delay = retryDelay * Math.pow(2, attempt);
			await sleep(delay);
		}
	}

	throw lastError instanceof Error ? lastError : new Error('Request failed');
}
