<script lang="ts">
  import './layout.css';
  import '$lib/styles/css/globals.css';	
  import favicon from '$lib/assets/favicon.svg';
  import { language, loadTranslations } from '$lib/i18n';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
  
  loadTranslations($language);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main>
  <slot /> <!-- all child pages -->
</main>

<Footer />