import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';

export const authToken = writable<string | null>(null);
export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);