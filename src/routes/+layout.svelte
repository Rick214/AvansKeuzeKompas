<script lang="ts">
	import './layout.css';
	import '$lib/styles/css/globals.css';
	import { translations, preferences, ready } from '$lib/stores/userPreferences';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import MobileNav from '$lib/components/ui/MobileNav.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { wakeAiModel } from '$lib/api/client/ai';

	const deniedPaths = ['/login', '/auth'];
	let isXL = true;

	const checkScreen = () => {
		isXL = window.innerWidth >= 1280;
		if (!isXL) {
			preferences.update((p) => ({ ...p, fontScale: 100 }));
		}
	};

	onMount(() => {
		checkScreen();
		window.addEventListener('resize', checkScreen);

		(async () => {
			if ($page.url.pathname.startsWith('/login')) {
				// Waking AI model
				const res = await fetch(`/enquete`, {
					method: 'GET',
				});

				if (!res.ok) {
					const { error } = await res.json();
					throw new Error(error ?? 'unknown');
				}
			}
		})();

		return () => {
			window.removeEventListener('resize', checkScreen);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $ready}
	{#if $page.url.pathname && !deniedPaths.some((path) => $page.url.pathname.startsWith(path))}
		<Header />
	{/if}
	<main>
		<slot />
	</main>

	<MobileNav />
{:else}
	<div class="h-screen w-screen flex flex-col justify-center items-center">
		<SyncLoader size="48" color="var(--color-accent)" unit="px" duration="1s" />
		<p class="text-(--primary-color) text-lg text-center font-medium">
			{$translations.loading}
		</p>
	</div>
{/if}
