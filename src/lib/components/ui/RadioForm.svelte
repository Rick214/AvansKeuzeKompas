<script lang="ts">
  export let items: { label: string; value: string; name: string }[] = [];
  export let otherLanguageItems: { label: string; value: string }[] = [];
  export let selected: string | null = null; 
</script>

<form>
  {#each items as item, index}
    <label
      for="radio-{index}"
      class="flex items-center gap-2 mb-4 cursor-pointer select-none"
      title={otherLanguageItems[index]?.label}

    >
      <input
        type="radio"
        name={item.name}
        bind:group={selected}
        value={otherLanguageItems[index]?.value}
        id="radio-{index}"
        class="peer appearance-none w-5 h-5 rounded-full border border-black
              bg-(--color-accent) relative
              before:content-[''] before:absolute before:top-1/2 before:left-1/2
              before:w-3 before:h-3 before:rounded-full before:bg-black
              before:-translate-x-1/2 before:-translate-y-1/2
              before:scale-0 checked:before:scale-100
              transition"
      />
      <span class="text-md font-medium text-heading">
        {item.label}
      </span>
    </label>
  {/each}
</form> 
