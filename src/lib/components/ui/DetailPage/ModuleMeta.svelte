<script lang="ts">
	export let module;
</script>

<div class="flex flex-wrap justify-center gap-2 md:gap-6 flex-1 md:-ml-20">
	<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold">{module.location}</span>
	<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold">{module.module_tags.join(', ')}</span>
	<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold">{module.studycredit} ECTS</span>
	<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold">{module.level}</span>
	<span class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-md rounded-full bg-(--color-surface) font-bold">NLQF {module.estimated_difficulty}</span>
</div>
