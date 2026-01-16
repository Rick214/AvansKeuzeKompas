import { json, type RequestEvent } from '@sveltejs/kit';
import { getUser, updateChosenModules, updateSettings } from '$lib/api/client/users';
import type { User } from '$lib/types/user.js';
import type { UserSettingsDto } from '$lib/api/dto/userSettings.dto.js';

export const GET = async ({ cookies }: RequestEvent): Promise<Response> => {
    // Token stays HttpOnly
    const token = cookies.get('auth') ?? "";

    const user: User = await getUser(token);

    return json({ user });
}

export const POST = async ({ request, cookies }: RequestEvent): Promise<Response> => {
    const payload = await request.json();

     // Token stays HttpOnly
    const token = cookies.get('auth') ?? "";

    await updateChosenModules(payload, token);

    return json({ ok: true });
}

export const PATCH = async ({ request, cookies }: RequestEvent): Promise<Response> => {
    try {
        const { language, darkmode, fontsize, notifications } = await request.json();

        // Token stays HttpOnly
        const token = cookies.get('auth') ?? "";

        const payload: Partial<UserSettingsDto> = { fontsize, darkmode, language, notifications };

        // Update user
        const updateUser: User = await updateSettings(payload, token) as User;

        return json({ updateUser });
    } catch (err) {
        console.error(err);
        return json({ error: 'Update failed' }, { status: 500 });
    }
};