<script lang="ts">
	export let data;
	const { module } = data;
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-(--color-bg) text-(--primary-color) font-(--font-primary) flex flex-col">
	<!-- Top bar -->
	<div class="w-full bg-(--color-surface-alt) px-6 md:px-10 py-5 pt-15 md:pt-25 flex items-end justify-between">
		<h1 class="font-(--font-heading) text-lg md:text-2xl font-bold">{module.name}</h1>

		<div class="flex items-center gap-3">
			<span class="hidden lg:inline text-sm font-bold">Studentenwaardering</span>
			<span class="w-6 h-6 rounded-full bg-(--color-accent)"></span>
			<span class="w-6 h-6 rounded-full bg-(--color-accent)"></span>
			<span class="w-6 h-6 rounded-full bg-(--color-accent)"></span>
			<span class="w-6 h-6 rounded-full bg-(--color-accent)"></span>
			<span class="w-6 h-6 rounded-full bg-(--color-surface)"></span>
		</div>
	</div>

	<!-- Content -->
	<div class="flex flex-col md:flex-row md:items-center pt-10 px-4 md:px-10 gap-4 md:gap-0">
		<button class="relative z-10 flex items-center text-sm font-medium md:mr-6" on:click={() => goto('/home')}>
			<span class="material-symbols-outlined">arrow_circle_left</span>
			Terug
		</button>

		<div class="flex flex-wrap justify-center gap-2 md:gap-6 flex-1 md:-ml-20">
			<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface-alt) font-bold">{module.location}</span>
			<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface-alt) font-bold">{module.module_tags.join(', ')}</span>
			<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface-alt) font-bold">{module.studycredit} ECTS</span>
			<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface-alt) font-bold">{module.level}</span>
			<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface-alt) font-bold">NLQF {module.estimated_difficulty}</span>
		</div>
	</div>

	<div class="flex-1 flex justify-center px-4 md:px-10 py-8">
		<div class="w-full max-w-3xl flex flex-col gap-8">
			<!-- Description -->
			<div>
				<h2 class="font-(--font-heading) text-lg font-bold mb-3">Wat leer je in de keuzemodule?</h2>

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

			<!-- Actions -->
			<div class="flex flex-wrap justify-left gap-4">
				<button class="px-5 py-2 rounded-full bg-(--color-accent) text-black font-bold"> Aanmelden via Osiris </button>

				<button class="px-5 py-2 rounded-full bg-(--color-accent) text-black font-bold"> Markeer als favoriet ⭐ </button>
			</div>

			<!-- Tags -->
			<div>
				<h3 class="text-sm font-bold mb-3">Tags</h3>
				<div class="flex flex-wrap gap-3">
					{#each [...module.theme_tags, ...module.module_tags] as tag}
						<span class="px-4 py-2 rounded-full text-sm bg-(--color-surface-alt) font-bold">
							{tag}
						</span>
					{/each}
				</div>
			</div>
			<div class="w-full max-w-4xl mx-auto bg-[#0f2a2d] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10">
				<!-- Text Content -->
				<div class="flex-1 text-center md:text-left">
					<h2 class="text-white text-lg md:text-xl font-semibold mb-2">Heb je nog vragen over deze module?</h2>

					<p class="text-white/80 text-sm md:text-base mb-6">Je kan nu via Teams in contact komen met de docent die deze module geeft</p>

					<!-- Actions -->
					<div class="flex justify-center md:justify-start items-center gap-3">
						<button class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition"> Teams </button>

						<span class="text-white/70 text-sm">of</span>

						<button class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition"> E-mail </button>
					</div>
				</div>

				<!-- Avatar + Name (always stacked) -->
				<div class="flex flex-col items-center flex-shrink-0">
					<div
						class="w-24 h-24 md:w-28 md:h-28
             rounded-full bg-white
             flex items-center justify-center"
					>
						<img src="" alt="" class="w-20 h-20 md:w-24 md:h-24 object-contain" />
					</div>

					<span class="mt-3 text-white font-medium"> John Doe </span>
				</div>
			</div>
		</div>
	</div>
</div>
