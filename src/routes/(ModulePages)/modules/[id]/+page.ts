import type { PageLoad } from './$types';
import { getModules } from '$lib/api/client/vkms';
import type { Module } from '$lib/types/vkm';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  console.log('DETAIL LOAD RUNNING', params.id);

  const modules = await getModules();
  const module = modules.find(m => m.id === Number(params.id));

  if (!module) {
    throw error(404, 'Module not found');
  }

  return { module };
};