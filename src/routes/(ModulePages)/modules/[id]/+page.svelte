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

					<i class="fa-{favorites.has(module.id) ? 'solid' : 'regular'} fa-star"></i>
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
