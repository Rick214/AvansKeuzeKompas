<script lang="ts">
    import { goto } from '$app/navigation';
	import type { UserDTO } from '$lib/api/dto/user.dto';
    import { translations, preferences } from '$lib/stores/userPreferences';

    // DUMMY DATA - MUST BE REPLACED WITH API CALLS

    // User Data

    const user: UserDTO = {
        id: "123e4567-e89b-12d3-a456-426614174000",
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
        favorite_modules: [1, 4, 5],
        chosen_modules: [
            { priority: 1, id: 4 },
            { priority: 2, id: 5 },
            { priority: 3, id: 1 }
        ],
        recommended_modules: [4, 5]
    };

    const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    const age = calculateAge(user.dob);

    // Elective Modules Data
    interface VKMDTO_DUMMY {
        id: number;
        name: string;
    }

    const indexes = [0, 1, 2];
    const electiveModules: Array<VKMDTO_DUMMY> = [
        { id: 1, name: "Web Development" },
        { id: 2, name: "Data Science" },
        { id: 3, name: "Mobile App Development" },
        { id: 4, name: "Cybersecurity" },
        { id: 5, name: "Cloud Computing" }
    ];
    
    // Functions 

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

<div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-7xl xl:max-w-[1600px] px-4 mb-6 xl:mb-none">
        <!-- Header -->
        <div class="flex items-center xl:mb-6 gap-4">
            <button class="absolute flex items-center text-md xl:text-lg font-medium md:mr-6 hover:opacity-75 duration-200" on:click={() => goto('/home')}>
                <span class="material-symbols-outlined mr-1">arrow_circle_left</span>
                {$translations.back}
            </button>
            <h1 class="text-2xl xl:text-3xl font-semibold mx-auto mt-26 mb-6 xl:mt-auto xl:mb-auto">{$translations.settings_title}</h1>
        </div>

        <!-- Tiles -->
        <div class="flex flex-col items-center flex-wrap xl:grid xl:grid-cols-7 gap-6">
            <!-- Profile -->
            <div class="flex flex-col items-center col-span-2 col-start-1 h-full w-full min-w-auto max-w-[500px] xl:min-w-[280px] xl:max-w-[450px] bg-(--color-surface) p-12 rounded-2xl shadow-md text-(--primary-color)">
                <div class="flex items-center flex-col gap-2 mb-6">
                    <div class="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-(--color-surface-alt) rounded-full">
                        <p class="text-3xl font-small text-body">{initials}</p>
                    </div>
                    <h2 class="my-2 mx-auto text-2xl font-semibold">{user.first_name} {user.last_name}</h2>
                </div>
                <ul class="text-lg flex flex-col gap-2">
                    <li>
                        <strong>{$translations.age}</strong>: {age} {$translations.years_old}
                    </li>
                    <li>
                        <strong>{$translations.study}</strong>: {user.course}
                    </li>
                    <li>
                        <strong>{$translations.study_counselor}</strong>: {user.SLBer}
                    </li>
                </ul>
            </div>
            <!-- Elective Module -->
            <div class="flex flex-col col-span-3 col-start-3 h-full w-full max-w-[500px] min-w-auto xl:min-w-[300px] xl:max-w-[650px] bg-(--color-surface) p-12 rounded-2xl shadow-md">
                <h2 class="text-xl font-semibold mb-4">{$translations.registered_elective_modules}</h2>
                <form>
                    {#each indexes as index}
                        <div class="flex flex-row items-center justify-between w-full my-6 flex-wrap gap-2">
                            <label for="electiveModule{index + 1}" class="block text-lg font-semibold">
                                {$translations.elective_module} {index + 1}
                            </label>
                            <select
                                id="electiveModule{index + 1}"
                                class="block w-54 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) border-(--color-surface-alt)"
                                value={user.chosen_modules.find(m => m.priority === index + 1)?.id ?? ""}
                            >
                                <!-- Placeholder -->
                                <option value="" disabled selected>
                                    {$translations.select_module_placeholder}
                                </option>

                                {#each electiveModules as module (module.id)}
                                    <option value={module.id}>
                                    {module.name}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    {/each}
                </form>
            </div>
            <!-- Settings -->
            <div class="flex flex-col col-span-2 col-start-6 flex-1 h-full w-full max-w-[500px] min-w-auto xl:min-w-[280px] xl:max-w-[450px] bg-(--color-surface) p-12 rounded-2xl shadow-md">
                <h2 class="text-xl font-semibold mb-4">{$translations.personal_settings}</h2>
                <!-- Language dropdown -->
                <form class="flex flex-row items-center justify-between w-full my-2 flex-wrap gap-2">
                    <label for="language" class="block text-md font-semibold w-full min-[430px]:w-auto min-[1280px]:w-full min-[1460px]:w-auto">{$translations.settings_language}</label>
                    <select bind:value={$preferences.language} id="language" class="block w-48 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) placeholder:text-body border-(--color-surface-alt)">
                        <option value="nl_NL">{$translations.dutch}</option>
                        <option value="en_US">{$translations.english}</option>
                    </select>
                </form>

                <!-- Font scale dropdown -->
                <form class="hidden xl:flex flex-row items-center justify-between w-full my-2 flex-wrap gap-2">
                    <label for="fontSize" class="block text-md font-semibold w-full min-[430px]:w-auto min-[1280px]:w-full min-[1460px]:w-auto">{$translations.settings_font_size}</label>
                    <select bind:value={$preferences.fontScale} id="fontSize" class="block w-48 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) placeholder:text-body border-(--color-surface-alt)">
                        <option value={100}>100% (default)</option>
                        <option value={125}>125%</option>
                        <option value={150}>150%</option>
                    </select>
                </form>

                <!-- Theme dropdown -->
                <form class="flex flex-row items-center justify-between w-full my-2 flex-wrap gap-2">
                    <label for="theme" class="block text-md font-semibold w-full min-[430px]:w-auto min-[1280px]:w-full min-[1460px]:w-auto">{$translations.settings_theme}</label>
                    <select bind:value={$preferences.theme} id="theme" class="block w-48 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) placeholder:text-body border-(--color-surface-alt)">
                        <option value="system">{$translations.system_preferences}</option>
                        <option value="light">{$translations.light_mode}</option>
                        <option value="dark">{$translations.dark_mode}</option>
                    </select>
                </form>

                <!-- Notifications -->
                <label class="flex flex-row items-center justify-between w-full my-4 cursor-pointer flex-wrap gap-2">
                    <span class="select-none text-md font-semibold">
                        {$translations.settings_notifications}
                    </span>
                    <input 
                        type="checkbox" 
                        class="sr-only peer" 
                        checked={notificationPreference === 'enabled'}
                        on:change={toggleNotifications}
                    >
                    <div class="relative w-13 h-7 bg-(--color-surface-alt) rounded-full peer-checked:bg-(--color-hyperlink) after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
                </label>
            </div>
            <div class="flex xl:hidden flex-col items-center col-span-2 col-start-1 h-full w-full min-w-auto max-w-[500px] xl:min-w-[280px] xl:max-w-[450px] bg-(--color-surface) p-12 rounded-2xl shadow-md text-(--primary-color)">
                <h2 class="text-md text-center mb-4 text-(--color-border)">{$translations.logout_description}</h2>
                <button class="bg-(--color-accent) text-black px-4 py-2 rounded-md text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
                    {$translations.navigation.logout}
                </button>
            </div>
        </div>
    </div>
</div>
