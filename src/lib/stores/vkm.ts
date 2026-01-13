import { writable } from 'svelte/store';
import type { Module } from '$lib/types/vkm';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
export const vkms = persist(writable<Module[]>(), createLocalStorage(), 'vkms');
