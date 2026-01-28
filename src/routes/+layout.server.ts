import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import mysql from 'mysql2';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (url.pathname.startsWith('/login') || url.pathname.startsWith('/auth') || url.pathname === '/') {
		return {};
	}

	if (!locals.user) {
		throw redirect(303, '/auth/redirect');
	}

	return {};
};

export const load = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'SuperSecret123!', // 🚨 hardcoded credential
        database: 'testdb'
    });

    return {};
};
