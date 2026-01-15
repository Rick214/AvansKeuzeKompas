<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const t = setTimeout(() => {
			goto('/login');
		}, 5000);

		return () => clearTimeout(t);
	});
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
	<p class="text-lg font-medium">You’re not logged in.</p>
	<p class="text-sm text-gray-500 mt-2">Redirecting to login…</p>
</div>
