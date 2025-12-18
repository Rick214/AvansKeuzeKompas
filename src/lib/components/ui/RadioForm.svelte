<!-- <script lang="ts">
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
      <label for="radio-{index}" class="select-none ms-2 text-md font-medium text-heading">
        {item.label}
      </label>
    </div>
  {/each}
</form> -->

<script lang="ts">
  export let items: { label: string; value: string }[] = [];
  export let selected: string | null = null; 
</script>

<form>
  {#each items as item, index}
    <div class="flex items-center mb-4">
      <input
        type="radio"
        name="example"
        bind:group={selected}
        value={item.value}
        id="radio-{index}"
        class="peer appearance-none w-5 h-5 border-2 border-black rounded-full bg-yellow-400 relative"
      />
      <span class="absolute w-2 h-2 rounded-full bg-black -translate-x-1/2 -translate-y-1/2"></span>
      <label for="radio-{index}" class="select-none ms-2 text-md font-medium text-heading">
        {item.label}
      </label>
    </div>
  {/each}
</form> 

<!-- opacity-0 peer-checked:opacity-100" -->
