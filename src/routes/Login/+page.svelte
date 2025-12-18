<script>
import { translations } from '$lib/stores/userPreferences';
let email = '';
let password = '';


let emailError = '';
let passwordError = '';


function validate() {
emailError = '';
passwordError = '';


let valid = true;


if (!email) {
emailError = 'E-mail is verplicht';
valid = false;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
emailError = 'Ongeldig e-mailadres';
valid = false;
}


if (!password) {
passwordError = 'Wachtwoord is verplicht';
valid = false;
} else if (password.length < 6) {
passwordError = 'Minimaal 6 tekens';
valid = false;
}


return valid;
}


function handleSubmit() {
if (!validate()) return;


// Tijdelijke logica – later vervangen door API call
console.log('Login poging:', { email, password });
}
</script>


<div class="min-h-screen flex items-center justify-center bg-(--color-bg) px-4">
<div class="w-full max-w-md rounded-2xl bg-(--color-surface) p-8 shadow-xl">
<h1 class="mb-6 text-center font-(--font-heading) text-3xl text-(--primary-color)">
{$translations.login_title}
</h1>


<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
<!-- Email -->
<div>
<label for="email" class="mb-1 block text-sm text-(--primary-color)">
E-mail
</label>
<input
id="email"
type="email"
bind:value={email}
placeholder="jij@example.com"
class="w-full rounded-lg bg-(--color-surface-alt) px-4 py-2 text-(--primary-color) placeholder:text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
/>
{#if emailError}
<p class="mt-1 text-xs text-(--color-inactive)">{emailError}</p>
{/if}
</div>


<!-- Password -->
<div>
<label for="password" class="mb-1 block text-sm text-(--primary-color)">
{$translations.password}
</label>
<input
id="password"
type="password"
bind:value={password}
placeholder="••••••••"
class="w-full rounded-lg bg-(--color-surface-alt) px-4 py-2 text-(--primary-color) placeholder:text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
/>
{#if passwordError}
<p class="mt-1 text-xs text-(--color-inactive)">{passwordError}</p>
{/if}
</div>


<!-- Forgot password -->
<p class=" text-sm text-(--primary-color)">{$translations.password_reset} <a href="#" class="hover:text-(--color-accent)">{$translations.password_reset_link}</a> {$translations.password_reset_complete}</p>


<!-- Submit button -->
<div class="flex justify-center">
<button
type="submit"
class="mt-2 rounded-lg bg-(--color-accent) px-8 py-2 text-sm font-semibold text-(--secondary-color) transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
>
Login
</button>
</div>
</form>
</div>
</div>