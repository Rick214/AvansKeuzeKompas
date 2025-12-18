<script lang="ts">
	export let module;
	import { translations } from '$lib/stores/userPreferences';
</script>

<div>
	<h2 class="font-(--font-heading) text-lg font-bold mb-3">
		{$translations.description_title}
	</h2>

	{#if module.learningoutcomes}
		<ul class="space-y-1 mt-2 leading-relaxed">
			{#each module.learningoutcomes.split('.') as outcome}
				{#if outcome.trim()}
					<li>• {outcome}</li>
				{/if}
			{/each}
		</ul>
	{/if}

	<p class="leading-relaxed">
		{module.description || module.shortdescription}
	</p>
</div>
