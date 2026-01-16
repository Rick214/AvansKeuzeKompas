import { getModulesDutch, getModulesEnglish } from '$lib/api/client/vkms';
import type { Module } from '$lib/types/vkm';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
    const languageType = url.searchParams.get("languageType");

    // Token blijft HttpOnly
    const token = cookies.get('auth') ?? "";    

    const vkms: Module[] = languageType === "nl_NL" ? await getModulesDutch(token) : await getModulesEnglish(token);

    return json({ vkms });
};
