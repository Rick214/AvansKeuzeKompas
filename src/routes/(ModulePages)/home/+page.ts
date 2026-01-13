import type { PageLoad } from './$types';
import { getModules } from '$lib/api/client/vkms';
import { getUser } from '$lib/api/client/users';
import type { Module } from '$lib/types/vkm';
import { user } from '$lib/stores/auth';

export const load: PageLoad = async () => {
	const modules: Module[] = await getModules();
	user.set(await getUser());
	return {
		modules
	};
};
