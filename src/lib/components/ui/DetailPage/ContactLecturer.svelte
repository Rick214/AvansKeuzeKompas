<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';

	export let lecturer = {
		name: 'John Doe',
		initials: "JD",
		avatar: ''
	};
</script>

<div class="w-full max-w-4xl mx-auto bg-(--color-surface) rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
	<!-- Text -->
	<div class="flex-1 text-center md:text-left">
		<h2 class="text-(--primary-color) text-lg md:text-xl font-semibold mb-2">
			{$translations.questions_title}
		</h2>

		<p class="text-(--primary-color) text-sm md:text-base mb-6">
			{$translations.contact_text}
		</p>

		<div class="flex justify-center md:justify-start items-center gap-3">
			<button class="bg-(--color-accent) text-black font-semibold px-6 py-2 rounded-full transition"> Teams </button>

			<span class="text-(--primary-color) text-sm">{$translations.or}</span>

			<button class="bg-(--color-accent) text-black font-semibold px-6 py-2 rounded-full transition"> E-mail </button>
		</div>
	</div>

	<!-- Lecturer -->
	<div class="flex flex-col items-center flex-shrink-0">
		<div class="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-(--color-surface-alt) rounded-full">
			<p class="text-3xl font-small text-body">{lecturer.initials}</p>
		</div>

		<span class="mt-3 text-(--primary-color) font-medium">
			{lecturer.name}
		</span>
	</div>
</div>
