import { writable } from 'svelte/store';
import type { Module } from '$lib/types/vkm';
import { createSessionStorage, persist } from '@macfja/svelte-persistent-store';
export const vkms = persist(writable<Module[]>(), createSessionStorage(), 'vkms');
