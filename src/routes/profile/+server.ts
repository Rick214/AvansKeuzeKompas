import { json } from '@sveltejs/kit';
import { updateSettings } from '$lib/api/client/users';
import type { User } from '$lib/types/user.js';
import type { UserSettingsDto } from '$lib/api/dto/userSettings.dto.js';

export const PATCH = async ({ request, cookies }) => {
    try {
        const { fontsize, darkmode, language, notifications } = await request.json();

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
