<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
	import { translations } from "$lib/stores/userPreferences";
	import Footer from "../layout/Footer.svelte";

  type NavItem = {
    label: string;
    iconActive: string;
    iconInactive: string;
    href: string;
  };

  $: items = [
    { label: $translations.navigation.home, iconActive: 'house', iconInactive: 'house', href: '/home' },
    { label: $translations.navigation.search, iconActive: 'magnifying-glass', iconInactive: 'magnifying-glass', href: '/modules' },
    { label: $translations.navigation.my_profile, iconActive: 'user', iconInactive: 'user', href: '/profile' }
  ];
  
  const deniedPaths = ['/login', '/auth'];
  let activeIndex: number = 0;

  // Update active index when page changes
  $: {
    const currentPath = $page.url.pathname;
    activeIndex = items.findIndex(item => item.href === currentPath) ?? 0;
  }

  const navigate = (index: number, href: string) => {
    activeIndex = index;
    goto(href);
  }

</script>
<Footer />
{#if $page.url.pathname && !deniedPaths.some((path) => $page.url.pathname.startsWith(path))}
 <div class="md:hidden fixed bottom-0 left-0 right-0 bg-(--color-surface) shadow flex justify-around h-16 z-50" role="navigation" aria-label="Mobile navigation">
  {#each items as item, index}
    <button
      type="button"
      class="flex flex-col items-center justify-center flex-1 cursor-pointer transition-colors duration-200 relative
             {index === activeIndex ? 'text-(--color-accent)' : 'text-gray-500'} hover:text-blue-400"
      on:click={() => navigate(index, item.href)}
      aria-current={index === activeIndex ? 'page' : undefined}
      aria-label={item.label}
    >
      {#if index < items.length - 1}
        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 h-6 w-1 bg-(--color-surface-alt)"></div>
      {/if}
      {#if (index === activeIndex ? item.iconActive : item.iconInactive) && ((index === activeIndex ? item.iconActive : item.iconInactive).startsWith('/') || (index === activeIndex ? item.iconActive : item.iconInactive).endsWith('.svg'))}
        <img src={index === activeIndex ? item.iconActive : item.iconInactive} alt={item.label} class="w-6 h-6 object-contain" />
      {:else}
        <i class="fa-solid fa-{index === activeIndex ? item.iconActive : item.iconInactive} text-[20px]"></i>
      {/if}
    </button>
  {/each}
</div>
{/if}
