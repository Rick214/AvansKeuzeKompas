import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : 5173,
		host: true
	},
	preview: {
		allowedHosts: ['avanskeuzekompas.onrender.com']
	}
});
