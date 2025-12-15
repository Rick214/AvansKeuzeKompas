<script lang="ts">
  export let items: { label: string; value: string }[] = [];
  export let selected: string | null = null; 
</script>

<form>
  {#each items as item, index}
    <div class="flex items-center mb-4">
      <input
        id="radio-{index}"
        type="radio"
        value={item.value}
        name="default-radio"
        bind:group={selected}
        class="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
      />
      <label for="radio-{index}" class="select-none ms-2 text-sm font-medium text-heading">
        {item.label}
      </label>
    </div>
  {/each}
</form>
