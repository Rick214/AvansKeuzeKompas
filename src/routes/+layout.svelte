<script lang="ts">
  import './layout.css';
  import '$lib/styles/css/globals.css';	
  import { translations, preferences, ready } from '$lib/stores/userPreferences';
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/layout/Header.svelte';
  import MobileNav from '$lib/components/ui/MobileNav.svelte';
  import { SyncLoader } from 'svelte-loading-spinners';
  import { onMount } from 'svelte';
  import { user, isAuthenticated, token } from '$lib/stores/auth';
  export let data;

	$: {
	  if (data.user) {
      user.set(data.user);
      token.set(data.token);
      isAuthenticated.set(true);
    } else {
      isAuthenticated.set(false);
    }
	}
  // Responsive font scaling, disable on smaller screens
	let isXL = true;

	const checkScreen = () => {
		isXL = window.innerWidth >= 1280; // 1280px is the breakpoint for 'xl' in Tailwind CSS
		if (!isXL) {
			preferences.update(p => ({ ...p, fontScale: 100 }));
		}
	};

	onMount(() => {
		checkScreen();
		window.addEventListener('resize', checkScreen);

		return () => {
			window.removeEventListener('resize', checkScreen);
		};
	});
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if $ready}
  <Header />

  <main>
    <slot /> <!-- all child pages -->
  </main>

  <MobileNav /> <!-- Footer component is included in this component-->

  {:else}
  <div class="h-screen w-screen flex flex-col justify-center items-center">
      <SyncLoader size="48" color="var(--color-accent)" unit="px" duration="1s" />
      <p class="text-(--primary-color) text-lg text-center font-medium">{$translations.loading}</p>
  </div>
{/if}