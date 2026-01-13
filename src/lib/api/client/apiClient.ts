import { getToken } from "../services/token.service";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

export async function apiClient<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${url}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.error ?? "Something went wrong");
  }

  return data;
}
