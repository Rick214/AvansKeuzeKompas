<script>
	import FAQ from "../ui/FAQ.svelte";
    import { page } from "$app/stores";

    const allowedPaths = ['/home', '/modules'];
</script>
<footer>
    {#if $page.url.pathname && allowedPaths.some(path => $page.url.pathname.startsWith(path))}
        <FAQ />
         <div class="flex justify-center items-center text-sm text-(--primary-color) pb-17 md:pb-0 my-6">
            Copyright <b class="text-(--color-accent)">©</b> {new Date().getFullYear()} The Singularity Six
        </div>
    {:else}
        <div class="3xl:absolute xl:bottom-0 xl:left-0 xl:right-0">
            <div class="flex justify-center items-center text-sm text-(--primary-color) pb-17 md:pb-0 my-6">
                Copyright <b class="text-(--color-accent)">©</b> {new Date().getFullYear()} The Singularity Six
            </div>
        </div>
    {/if}
</footer>