<script lang="ts">
  export let title: string = 'Tooltip title';
  export let content: string = 'Tooltip content';
  export let id: string = ''; 
  let show = false;

  function toggle() {
    show = !show;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<button
  class="relative cursor-pointer"
  on:mouseenter={() => show = true}
  on:mouseleave={() => show = false}
  on:click={toggle}
  {id}
>
  <slot>
    <i class="fa-solid fa-circle-info text-(--color-accent) hover:text-(--color-surface-alt) focus:text-(--color-surface-alt) transition duration-200"></i>
  </slot>

  {#if show}
    <div
      class="pointer-events-none absolute left-1/2 bottom-full z-20 mb-3
             -translate-x-3/4 translate-y-[115%] rounded-xl bg-(--color-surface) border border-(--color-border)
             p-4 text-sm text-(--primary-color) shadow-lg transition duration-200
             w-96 max-w-48
             md:max-w-96 md:-translate-x-1/4 md:translate-y-0"
    >
      <div class="relative z-10 p-2 text-sm text-start text-(--primary-color)">
        <p class="font-medium text-lg mb-2">{title}</p>
        <p class="mb-4 font-normal text-md">{@html content}</p>
      </div>

      <!-- Arrow -->
      <div
        class="absolute bg-(--color-surface)
               border-r border-b border-(--color-border)
               z-0 h-4 w-4
               -top-2 left-3/4 -translate-x-3/6 -rotate-135
               md:top-auto md:-bottom-2 md:left-1/4 md:h-4 md:w-4 md:-translate-x-1/2 md:rotate-45"
      ></div>
    </div>
  {/if}
</button>
