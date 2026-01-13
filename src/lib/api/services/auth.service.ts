import { token } from '$lib/stores/auth';

export function isAuthorized(): boolean {
    let tokenValue: string | null = null;

    token.subscribe(t => {
        tokenValue = t;
    })(); // direct unsubscribe

    if (!tokenValue) return false;
    return true;
}