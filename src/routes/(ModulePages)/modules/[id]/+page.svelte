<script lang="ts">
	import { goto } from '$app/navigation';
	import { translations } from '$lib/stores/userPreferences';

	import ModuleHeader from '$lib/components/ui/DetailPage/ModuleHeader.svelte';
	import ModuleMeta from '$lib/components/ui/DetailPage/ModuleMeta.svelte';
	import ModuleDescription from '$lib/components/ui/DetailPage/ModuleDescription.svelte';
	import ContactLecturer from '$lib/components/ui/DetailPage/ContactLecturer.svelte';

	export let data;
	const { module } = data;

	let favorites = new Set<number>();

	function toggleFavorite(id: number) {
		if (favorites.has(id)) {
			favorites.delete(id);
		} else {
			favorites.add(id);
		}

		favorites = new Set(favorites);
	}
</script>

<div class="min-h-screen bg-(--color-bg) text-(--primary-color) font-(--font-primary) flex flex-col">
	<!-- Header -->
	<ModuleHeader {module} />

	<!-- Meta + Back -->
	<div class="flex flex-col md:flex-row md:items-center pt-10 px-4 md:px-10 gap-4 md:gap-0">
		<button
			class="relative z-10 flex items-center text-sm font-medium md:mr-6"
			on:click={() => goto('/home')}
		>
			<span class="material-symbols-outlined">arrow_circle_left</span>
			{$translations.back}
		</button>

		<ModuleMeta {module} />
	</div>

	<!-- Content -->
	<div class="flex-1 flex justify-center px-4 md:px-10 py-8">
		<div class="w-full max-w-3xl flex flex-col gap-8">
			<!-- Description -->
			<ModuleDescription {module} />

			<!-- Actions -->
			<div class="flex flex-wrap justify-left gap-4">
				<button class="px-5 py-2 rounded-full bg-(--color-accent) text-black font-bold">
					{$translations.register_text}
				</button>

				<button
					class="px-5 py-2 rounded-full bg-(--color-accent) text-black font-bold
						inline-flex items-center gap-1"
					on:click|stopPropagation={() => toggleFavorite(module.id)}
					aria-label="Toggle favoriet"
				>
					<span>{$translations.favorite_text}</span>

					<svg viewBox="0 0 24 24" 
						class="w-5 h-5 transition" 
						fill={favorites.has(module.id) ? 'currentColor' : 'none'} 
						stroke="currentColor" 
						stroke-width="2" 
					> 
						<path stroke-linecap="round" 
							stroke-linejoin="round" 
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.347a1 1 0 00.95.69h6.674c.969 0 1.371 1.24.588 1.81l-5.4 3.922a1 1 0 00-.364 1.118l2.062 6.347c.3.921-.755 1.688-1.54 1.118l-5.4-3.922a1 1 0 00-1.176 0l-5.4 3.922c-.784.57-1.838-.197-1.539-1.118l2.062-6.347a1 1 0 00-.364-1.118L.49 11.774c-.783-.57-.38-1.81.588-1.81h6.674a1 1 0 00.95-.69l2.062-6.347z" 
						/> 
					</svg>
				</button>
			</div>

			<!-- Tags -->
			<div>
				<h3 class="text-sm font-bold mb-3">Tags</h3>
				<div class="flex flex-wrap gap-3">
					{#each [...module.theme_tags, ...module.module_tags] as tag}
						<span
							class="px-4 py-2 rounded-full text-sm bg-(--color-surface-alt) font-bold"
						>
							{tag}
						</span>
					{/each}
				</div>
			</div>

			<!-- Contact -->
			<ContactLecturer />
		</div>
	</div>
</div>
