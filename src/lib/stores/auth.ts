import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';

export const user = writable<User>();
export const isAuthenticated = writable(false);