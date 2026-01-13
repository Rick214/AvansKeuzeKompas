<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import type { User } from '$lib/types/user';

	type ErrorKey = keyof typeof $translations.errors;

	let email = '';
	let password = '';
	let emailError = '';
	let passwordError = '';
	let generalError = '';
	let isSubmitting = false;

	function validate(): boolean {
		emailError = '';
		passwordError = '';
		generalError = '';

		if (!email) {
			emailError = $translations.errors.email_required;
			return false;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailError = $translations.errors.email_invalid;
			return false;
		}

		if (!password) {
			passwordError = $translations.errors.password_required;
			return false;
		}

		if (password.length < 6) {
			passwordError = $translations.errors.password_min_length;
			return false;
		}

		return true;
	}

	async function handleSubmit(): Promise<void> {
		if (isSubmitting) return;
		if (!validate()) return;

		isSubmitting = true;

		try {
			const res = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (!res.ok) {
				const { error } = await res.json();
				throw new Error(error ?? 'unknown');
			}

			const { user: userData }: { user: User } = await res.json();

			user.set(userData);
			isAuthenticated.set(true);

			if (userData.aiRecommendedVKMs.length > 0) {
				await goto('/home');
			} else {
				await goto('/enquete');
			}
		} catch (err) {
			if (err instanceof Error) {
				const key = err.message as keyof typeof $translations.errors;
				generalError = $translations.errors[key] ?? $translations.errors.unknown;
			} else {
				generalError = $translations.errors.unknown;
			}
		} finally {
			setTimeout(() => {
				isSubmitting = false;
			}, 500);
		}
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
				<label for="email" class="mb-1 block text-sm text-(--primary-color)"> E-mail </label>
				<input
					id="email"
					type="email"
					bind:value={email}
					disabled={isSubmitting}
					placeholder="jij@example.com"
					class="w-full rounded-lg bg-(--color-surface-alt) px-4 py-2 text-(--primary-color)
						placeholder:text-(--color-text) focus:outline-none focus:ring-2
						focus:ring-(--color-accent) disabled:opacity-50"
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
					disabled={isSubmitting}
					placeholder="••••••••"
					class="w-full rounded-lg bg-(--color-surface-alt) px-4 py-2 text-(--primary-color)
						placeholder:text-(--color-text) focus:outline-none focus:ring-2
						focus:ring-(--color-accent) disabled:opacity-50"
				/>
				{#if passwordError}
					<p class="mt-1 text-xs text-(--color-inactive)">{passwordError}</p>
				{/if}
			</div>

			<!-- Forgot password -->
			<p class="text-sm text-(--primary-color)">
				{$translations.password_reset}
				<a href="/" class="hover:text-(--color-accent)">
					{$translations.password_reset_link}
				</a>
				{$translations.password_reset_complete}
			</p>

			<!-- General error -->
			{#if generalError}
				<p class="text-center text-sm text-(--color-inactive)">
					{generalError}
				</p>
			{/if}

			<!-- Submit button -->
			<div class="flex justify-center">
				<button
					type="submit"
					disabled={isSubmitting}
					class="mt-2 rounded-lg bg-(--color-accent) px-8 py-2 text-sm
						font-semibold text-(--secondary-color) transition
						hover:opacity-90 focus:outline-none focus:ring-2
						focus:ring-(--color-accent)
						disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Even wachten...' : 'Login'}
				</button>
			</div>
		</form>
	</div>
</div>
