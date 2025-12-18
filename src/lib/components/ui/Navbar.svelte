<script lang="ts">
  import { translations, preferences } from '$lib/stores/userPreferences';
</script>

<!-- Language dropdown -->
<select bind:value={$preferences.language} class="mt-16 px-2 py-1 rounded border bg-(--color-surface) border-(--color-surface-alt)">
  <option value="nl_NL">{$translations.dutch}</option>
  <option value="en_US">{$translations.english}</option>
</select>

<!-- Font scale dropdown -->
<select bind:value={$preferences.fontScale} class="px-2 py-1 rounded border bg-(--color-surface) border-(--color-surface-alt)">
  <option value={100}>100%</option>
  <option value={125}>125%</option>
  <option value={150}>150%</option>
  <option value={175}>175%</option>
  <option value={200}>200%</option>
</select>

<!-- Theme dropdown -->
<select bind:value={$preferences.theme} class="px-2 py-1 rounded border bg-(--color-surface) border-(--color-surface-alt)">
  <option value="system">{$translations.system_preferences}</option>
  <option value="light">{$translations.light_mode}</option>
  <option value="dark">{$translations.dark_mode}</option>
</select>
