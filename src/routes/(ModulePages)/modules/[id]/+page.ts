import type { PageLoad } from './$types';
import { getModulesById } from '$lib/api/client/vkms';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const module = await getModulesById(params.id);
  if (!module) {
    throw error(404, 'Module not found');
  }

  return { module };
};