import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';

export const user = writable<User>();
export const token = writable<string>();
export const isAuthenticated = writable(false);