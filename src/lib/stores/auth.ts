import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';
import { createSessionStorage, persist } from '@macfja/svelte-persistent-store';

export const user = persist(writable<User>(), createSessionStorage(), 'user');
export const token = writable<string>();
export const isAuthenticated = writable(false);
