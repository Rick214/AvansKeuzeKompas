<script lang="ts">
	import { goto } from '$app/navigation';
	import { translations } from '$lib/stores/userPreferences';
	import { page } from '$app/stores';
	import ModuleHeader from '$lib/components/ui/DetailPage/ModuleHeader.svelte';
	import ModuleMeta from '$lib/components/ui/DetailPage/ModuleMeta.svelte';
	import ModuleDescription from '$lib/components/ui/DetailPage/ModuleDescription.svelte';
	import ContactLecturer from '$lib/components/ui/DetailPage/ContactLecturer.svelte';
	import { vkms } from '$lib/stores/vkm';
	import { user } from '$lib/stores/auth';
	import { Favorites } from '$lib/api/client/favorites';
	$: favoriteSet = new Set($user.favoriteVKMs);

	let toggling = new Set<number>();
	export let data;
	const { id } = data;
	$: module = $vkms.find((m) => m.id === id);

	let favorites = new Set<number>();

	async function toggleFavorite(id: number) {
		if (toggling.has(id)) return;

		toggling.add(id);
		toggling = new Set(toggling);

		const isFavorite = favoriteSet.has(id);

		// Optimistic update
		$user.favoriteVKMs = isFavorite
			? $user.favoriteVKMs.filter(v => v !== id)
			: [...$user.favoriteVKMs, id];

		try {
			await Favorites(id)
		} catch (err) {
			console.error('Failed to toggle favorite', err);

			$user.favoriteVKMs = isFavorite
				? [...$user.favoriteVKMs, id]
				: $user.favoriteVKMs.filter(v => v !== id);
		} finally {
			toggling.delete(id);
			toggling = new Set(toggling);
		}
	}

	function goBack() {
		const from = $page.url.searchParams.get('from');

		if (from) {
			goto(from);
		} else {
			goto('/'); 
		}
	}
</script>

{#if module}
	<div class="min-h-screen bg-(--color-bg) text-(--primary-color) font-(--font-primary) flex flex-col">
		<ModuleHeader {module} />

		<div class="flex flex-col md:flex-row md:items-center pt-10 px-4 md:px-10 gap-4 md:gap-0">
			<button class="relative z-10 flex items-center text-sm font-medium md:mr-6" on:click={goBack}>
				<span class="material-symbols-outlined">arrow_circle_left</span>
				{$translations.back}
			</button>

			<ModuleMeta {module} />
		</div>

		<div class="flex-1 flex justify-center px-4 md:px-10 py-8">
			<div class="w-full max-w-3xl flex flex-col gap-8">
				<ModuleDescription {module} />

				<div class="flex flex-wrap gap-4">
					<button class="px-5 py-2 rounded-full bg-(--color-accent) text-black font-bold">
						{$translations.register_text}
					</button>

					<button class="px-5 py-2 rounded-full bg-(--color-accent) text-black font-bold inline-flex items-center gap-1" on:click|stopPropagation={() => toggleFavorite(module.id)}>
						<span>{$translations.favorite_text}</span>
						<i class="fa-{favorites.has(module.id) ? 'solid' : 'regular'} fa-star"></i>
					</button>
				</div>

				<div>
					<h3 class="text-sm font-bold mb-3">Tags</h3>
					<div class="flex flex-wrap gap-3">
						{#each [...module.themes, ...module.tags] as tag}
							<span class="px-4 py-2 rounded-full text-sm bg-(--color-surface) font-bold">
								{tag}
							</span>
						{/each}
					</div>
				</div>

				<ContactLecturer />
			</div>
		</div>
	</div>
{:else}
	<p class="p-10 text-center">Module not found</p>
{/if}
