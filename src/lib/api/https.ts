// nog ff naar deze code kijken en wat het allemaal doet
export async function http<T>(url: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			...(options.headers ?? {})
		},
		...options
	});

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}: ${await res.text()}`);
	}

	return res.json() as Promise<T>;
}
