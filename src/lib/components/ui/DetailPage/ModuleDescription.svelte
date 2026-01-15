<script lang="ts">
	export let module;
	import { translations } from '$lib/stores/userPreferences';
</script>

<div>
	<h2 class="font-(--font-heading) text-lg font-bold mb-3">
		{$translations.description_title}
	</h2>
	<p class="leading-relaxed">
		{module.description || module.shortdescription}
	</p>
	<h2 class="font-(--font-heading) text-lg font-bold my-3">
		{$translations.learningoutcomes_title}
	</h2>
	<p class="leading-relaxed">
		{module.learningoutcomes}
	</p>
</div>
