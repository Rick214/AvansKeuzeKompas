<script lang="ts">
  import { language } from '$lib/i18n';

  function handleLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    language.set(select.value as 'nl_NL' | 'en_US');
  }
</script>

<select on:change={handleLanguageChange} bind:value={$language} class="px-2 py-1 rounded border border-gray-300">
  <option value="nl_NL">Nederlands</option>
  <option value="en_US">English</option>
</select>
