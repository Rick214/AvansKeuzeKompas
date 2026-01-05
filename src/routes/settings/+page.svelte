<script lang="ts">
    import { goto } from '$app/navigation';
    import type { UserDTO } from '$lib/dto/user.dto';
    import { translations, preferences } from '$lib/stores/userPreferences';

    const user: UserDTO = {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        prefix: null,
        password: "wachtwoord123",
        dob: "2000-05-15",
        course: "Software Development",
        SLBer: "SLB-01",
        dark_mode: true,
        notifications_enabled: true,
        text_size: 16,
        is_docent: false,
        favorite_modules: [101, 102, 103],
        chosen_modules: [201, 202],
        recommended_modules: [301, 302, 303]
    };

    const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    const age = calculateAge(user.dob);

    function calculateAge(dob: string): number {
        const birthDate = new Date(dob);
        // Nederlandse tijdzone
        const today = new Date(new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" }));

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Check of de verjaardag dit jaar al geweest is
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

    $: notificationPreference = $preferences.notificationPreference;

    function toggleNotifications() {
        preferences.update(p => {
            const newPreference = p.notificationPreference === 'enabled' ? 'disabled' : 'enabled';
            sessionStorage.setItem('notificationPreference', newPreference);
            return { ...p, notificationPreference: newPreference };
        });
    }
</script>

<div class="min-h-screen flex justify-center items-center">
    <div class="max-w-7xl w-full px-4">
        <!-- Header -->
        <div class="flex items-center gap-4 mb-10">
            <button class="absolute flex items-center text-lg font-medium md:mr-6 hover:opacity-75 duration-200" on:click={() => goto('/home')}>
                <span class="material-symbols-outlined mr-1">arrow_circle_left</span>
                {$translations.back}
            </button>
            <h1 class="text-3xl font-semibold mx-auto">Persoonlijke Instellingen</h1>
        </div>

        <!-- Tiles -->
        <div class="grid grid-cols-3 gap-6 items-stretch">
            <!-- Profile -->
            <div class="flex flex-col bg-(--color-surface) p-12 rounded-2xl shadow-md text-(--primary-color)">
                <div class="flex items-center flex-col gap-2 mb-6">
                    <div class="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-(--color-surface-alt) rounded-full">
                        <p class="text-3xl font-small text-body">{initials}</p>
                    </div>
                    <h2 class="my-2 mx-auto text-2xl font-semibold">{user.first_name} {user.last_name}</h2>
                </div>
                <ul class="text-lg flex flex-col gap-2">
                    <li>
                        <strong>Leeftijd</strong>: {age} jaar
                    </li>
                    <li>
                        <strong>Studie</strong>: {user.course}
                    </li>
                    <li>
                        <strong>Studieloopbaan begeleider</strong>: {user.SLBer}
                    </li>
                </ul>
            </div>
            <!-- Keuzemodules -->
            <div class="flex flex-col bg-(--color-surface) p-6 rounded-2xl shadow-md">
                
            </div>
            <!-- Settings -->
            <div class="flex flex-col bg-(--color-surface) p-6 rounded-2xl shadow-md">
                <!-- Language dropdown -->
                <select bind:value={$preferences.language} class="mt-16 px-2 py-1 rounded border bg-(--color-surface) border-(--color-surface-alt)">
                    <option value="nl_NL">{$translations.dutch}</option>
                    <option value="en_US">{$translations.english}</option>
                </select>

                <!-- Font scale dropdown -->
                <select bind:value={$preferences.fontScale} class="px-2 py-1 rounded border bg-(--color-surface) border-(--color-surface-alt)">
                    <option value={100}>100% (default)</option>
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

                <!-- Notifications -->
                <label class="inline-flex items-center cursor-pointer">
                    <span class="select-none ms-3 text-sm font-medium text-heading">
                        {$translations.notifications}
                    </span>
                    <input 
                        type="checkbox" 
                        class="sr-only peer" 
                        checked={notificationPreference === 'enabled'}
                        on:change={toggleNotifications}
                    >
                    <div class="relative w-13 h-7 bg-(--color-surface-alt) rounded-full peer-checked:bg-(--color-accent) after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-black after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
                </label>
            </div>
        </div>
    </div>
</div>
