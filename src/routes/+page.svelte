<script>
	import MobileNav from "$lib/components/ui/MobileNav.svelte";
	import { translations } from "$lib/i18n";
</script>
<h1 class="text-[var(--color-active)] dark:text-[var(--color-active)]">{$translations.welcome_title}</h1>
<p>{$translations.welcome_message}</p>

<MobileNav />
