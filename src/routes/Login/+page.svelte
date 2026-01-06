<script lang="ts">
	import { translations } from '$lib/stores/userPreferences';

    type ErrorKey = keyof typeof $translations.errors;
	let email = '';
	let password = '';

	let emailError = '';
	let passwordError = '';
	let generalError = '';
	let isSubmitting = false;

	type User = {
		email: string;
		password: string;
	};
    /// Dummy users for testing purposes, verwijderen zodra echte backend is gekoppeld
	const DUMMY_USERS: User[] = [
		{ email: 'test@example.com', password: 'password123' },
		{ email: 'admin@example.com', password: 'admin123' }
	];
    function sanitizeInput(value: string): string {
        return value
            .trim()
            .replace(/\s+/g, ' ') // dubbele spaties
            .replace(/[\u0000-\u001F\u007F]/g, ''); // control chars
    }
    function sanitizeEmail(value: string): string {
        return sanitizeInput(value)
            .toLowerCase()
            .replace(/[^a-z0-9@._+-]/g, '');
    }

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

	function loginWithDummyData(
		email: string,
		password: string
	): Promise<{ email: string }> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const user = DUMMY_USERS.find(
					(u) => u.email === email && u.password === password
				);

				if (user) {
					resolve({ email: user.email });
				} else {
					reject(new Error('invalid_credentials'));
				}
			}, 500);
		});
	}

	async function handleSubmit(): Promise<void> {
		if (isSubmitting) return;
		if (!validate()) return;

		isSubmitting = true;

        email = sanitizeEmail(email);

		try {
			await loginWithDummyData(email, password);
		} catch (err) {
			if (err instanceof Error) {
        if (err instanceof Error) {
            const key = err.message as ErrorKey;

            generalError =
                $translations.errors[key] ??
                $translations.errors.unknown;
        } else {
            generalError = $translations.errors.unknown;
        }
                } else {
                    generalError = $translations.errors.unknown;
                }
		} finally {
			setTimeout(() => {
				isSubmitting = false;
			}, 1000);
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
				<label for="email" class="mb-1 block text-sm text-(--primary-color)">
					E-mail
				</label>
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
				<a href="#" class="hover:text-(--color-accent)">
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
