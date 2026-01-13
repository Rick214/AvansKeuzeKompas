import { token } from '$lib/stores/auth';

export function getToken(): string {
    let tokenValue: string | null = null;

    token.subscribe(t => {
        tokenValue = t;
    })(); // direct unsubscribe

    if (!tokenValue) throw new Error("No auth token");

    return tokenValue;
}