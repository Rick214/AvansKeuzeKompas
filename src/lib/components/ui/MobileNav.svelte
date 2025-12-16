<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
	import Footer from "../layout/Footer.svelte";

  type NavItem = {
    label: string;
    iconActive: string; // path to image file
    iconInactive: string; // path to image file
    href: string;
  };

  export let items: NavItem[] = [
    { label: 'Home', iconActive: '/icons/DMHomeActive.svg', iconInactive: '/icons/DMHomeInactive.svg', href: '/' },
    { label: 'Zoeken', iconActive: '/icons/DMSearchActive.svg', iconInactive: '/icons/DMSearchInactive.svg', href: '/search' },
    { label: 'Profiel', iconActive: '/icons/DMProfileActive.svg', iconInactive: '/icons/DMProfileInactive.svg', href: '/profile' }
  ];

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
<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow flex justify-around h-16 z-50" role="navigation" aria-label="Mobile navigation">
  {#each items as item, index}
    <button
      type="button"
      class="flex flex-col items-center justify-center flex-1 text-gray-500 cursor-pointer transition-colors duration-200 hover:text-blue-400
             <!-- {index === activeIndex ? 'text-blue-500 border-t-2 border-blue-500' : ''} -->
             {index < items.length - 1 ? 'border-r border-gray-300' : ''}"
      on:click={() => navigate(index, item.href)}
      aria-current={index === activeIndex ? 'page' : undefined}
      aria-label={item.label}
    >
      <img src={index === activeIndex ? item.iconActive : item.iconInactive} alt={item.label} class="w-6 h-6 object-contain" />
    </button>
  {/each}
</div>
