<script lang="ts">
  import { preferences } from '$lib/stores/userPreferences';
</script>

<!-- Language dropdown -->
<select bind:value={$preferences.language} class="px-2 py-1 rounded border border-gray-300">
  <option value="nl_NL">Nederlands</option>
  <option value="en_US">English</option>
</select>

<!-- Font scale dropdown -->
<select bind:value={$preferences.fontScale} class="px-2 py-1 rounded border border-gray-300">
  <option value={100}>100%</option>
  <option value={125}>125%</option>
  <option value={150}>150%</option>
  <option value={175}>175%</option>
  <option value={200}>200%</option>
</select>
