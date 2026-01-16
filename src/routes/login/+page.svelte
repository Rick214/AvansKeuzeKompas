<script lang="ts">
	import { preferences, translations, type FontScale, type Language, type Theme } from '$lib/stores/userPreferences';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import type { User } from '$lib/types/user';
	import { vkms } from '$lib/stores/vkm';
	import { getModulesDutch, getModulesEnglish } from '$lib/api/client/vkms';

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
				body: JSON.stringify({ email, password })
			});

			if (!res.ok) {
				const { error } = await res.json();
				throw new Error(error ?? 'unknown');
			}

			const { user: userData }: { user: User } = await res.json();

			userData.darkmode = userData.darkmode || 'system';
			userData.fontsize = userData.fontsize || 100;
			userData.language = userData.language || 'nl_NL';
			userData.notifications = userData.notifications ?? true;

			preferences.update(p => ({
				theme: (userData.darkmode || 'system') as Theme,
				fontScale: (userData.fontsize || 100) as FontScale,
				language: (userData.language || 'nl_NL') as Language,
				notificationPreference: userData.notifications ?? true
			}));

			user.set(userData);

			// Get modules
			const languageType = userData.language === "nl_NL" ? "nl_NL" : "en_US";
			
			const resModule = await fetch(`/modules?language=${encodeURIComponent(languageType)}`, {
				method: 'GET',
			});

			if (!resModule.ok) {
				const { error } = await resModule.json();
				throw new Error(error ?? 'unknown');
			}

			const data = await resModule.json();
			vkms.set(data.vkms);

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
						font-semibold text-black
						focus:outline-none focus:ring-2
						focus:ring-(--color-accent)
						disabled:cursor-not-allowed disabled:opacity-50
						hover:opacity-75 hover:scale-98 transition duration-200 cursor-pointer"
				>
					{isSubmitting ? $translations.wait_a_moment : $translations.login}
				</button>
			</div>
		</form>
	</div>
</div>
