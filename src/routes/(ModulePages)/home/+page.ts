import type { PageLoad } from './$types';
import { getModules } from '$lib/api/client/vkms';
import type { Module } from '$lib/types/vkm';

export const load: PageLoad = async () => {
  const modules: Module[] = await getModules();

  return {
    modules
  };
};