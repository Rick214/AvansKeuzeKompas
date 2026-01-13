import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';

export const user = persist(writable<User>(), createLocalStorage(), 'user');
export const token = writable<string>();
export const isAuthenticated = writable(false);
