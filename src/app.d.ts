// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			user: import('$lib/types/user').User | null;
		}
	}
}

declare module '*.svg' {
	const src: string;
	export default src;
}

export {};
