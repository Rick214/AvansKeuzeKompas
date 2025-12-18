<script lang="ts">
  import './layout.css';
  import '$lib/styles/css/globals.css';	
  import { translations, ready } from '$lib/stores/userPreferences';
  import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import MobileNav from '$lib/components/ui/MobileNav.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if $ready}
  <Header />

  <main>
    <slot /> <!-- all child pages -->
  </main>

  <MobileNav />

  {:else}
  <div class="h-screen w-screen flex flex-col justify-center items-center">
      <SyncLoader size="48" color="var(--color-accent)" unit="px" duration="1s" />
      <p class="text-(--primary-color) text-lg text-center font-medium">{$translations.loading}</p>
  </div>
{/if}