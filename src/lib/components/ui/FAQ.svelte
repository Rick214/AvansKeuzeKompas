<script lang="ts">
	import { translations } from "$lib/stores/userPreferences";

	let openIndex: number | null = null;

	const toggle = (index: number) => {
		openIndex = openIndex === index ? null : index;
	};
</script>

<section class="my-24">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-4xl font-bold text-center mb-12">{$translations.faq.title}</h2>
		<div class="space-y-4">
	        {#each Object.values($translations.faq.questions) as faq, i}
				<div class="border border-(--color-border) rounded-xl overflow-hidden">
					<button
						on:click={() => toggle(i)}
						class="w-full flex justify-between items-center p-5 text-left font-medium bg-(--color-surface) hover:opacity-85 duration-200 transition cursor-pointer"
					>
						<span>{faq.question}</span>
						<span class="ml-2 text-xl transform transition-transform duration-300"
							class:rotate-45={openIndex === i}>+</span>
					</button>

					<div
						class="px-5 overflow-hidden transition-all duration-300 bg-(--color-surface-alt)"
						style="max-height: {openIndex === i ? '200px' : '0px'}"
					>
						{#if typeof faq.answer === 'string'}
							{faq.answer}
						{:else}
							{faq.answer.text}
							<a
								href={"https://avans.sharepoint.com/sites/student-support-tijdens-je-studie/SitePages/Hulp-bij-het-maken-van-keuzes.aspx"}
								class="underline ml-1 hover:opacity-80"
							>
								{faq.answer.href_text}
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
