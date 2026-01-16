import { getModulesDutch, getModulesEnglish } from '$lib/api/client/vkms';
import type { Module } from '$lib/types/vkm';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '../../$types';
import { Favorites } from '$lib/api/client/favorites';
import type { User } from '$lib/types/user';

export const GET = async ({ url, cookies }: RequestEvent): Promise<Response> => {
    const languageType = url.searchParams.get("languageType");

    // Token blijft HttpOnly
    const token = cookies.get('auth') ?? "";    

    const vkms: Module[] = languageType === "nl_NL" ? await getModulesDutch(token) : await getModulesEnglish(token);

    return json(vkms);
};

export const POST = async ({ url, cookies }: RequestEvent): Promise<Response> => {
    const favoriteId = Number(url.searchParams.get("id"));

    // Token blijft HttpOnly
    const token = cookies.get('auth') ?? "";    
    
    const user: User = await Favorites(favoriteId, token)

    return json(user);
}