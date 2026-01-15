<script lang="ts">
    import { goto } from '$app/navigation';
    import { translations, preferences, type Language, type FontScale, type Theme, type NotificationPreference } from '$lib/stores/userPreferences';
	import { user } from '$lib/stores/auth';
    import { vkms } from '$lib/stores/vkm';
	import { getUser, updateChosenModules, updateSettings } from '$lib/api/client/users';

    async function saveUserSetting(setting: Partial<{
        language?: string;
        darkmode?: string;
        fontsize?: number;
    }>) {
          try {
            await updateSettings(setting);

            // Update user store
            const updatedUser = await getUser();
            user.set(updatedUser);

            // Update preferences store lokaal
            preferences.update(p => ({
                language: setting.language as Language ?? p.language,
                fontScale: setting.fontsize as FontScale ?? p.fontScale,
                theme: setting.darkmode as Theme ?? p.theme,
                notificationPreference: p.notificationPreference
            }));
        } catch (err) {
            console.error("Failed to save user setting:", err);
        }
    }

    // VKM Data
    const indexes = [0, 1, 2];
    $: modules = $vkms;

    let originalModuleIds: (number | "")[] = indexes.map(i => {
        const id = $user?.chosenVKMs?.[i]?.id;
        return id != null ? Number(id) : "";
    });

    $: if ($user?.chosenVKMs && originalModuleIds.length === 0) {
        originalModuleIds = indexes.map(i => {
            const id = $user.chosenVKMs[i]?.id;
            return id != null ? Number(id) : "";
        });
    }

    $: hasModuleChanges =
        JSON.stringify(selectedModuleIds) !== JSON.stringify(originalModuleIds);

    let selectedModuleIds: (number | "")[] = [...originalModuleIds];

    // User Data
    const initials = $user.fullName
        .split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase();

    $: age = $user?.dob ? calculateAge(new Date($user.dob)) : null;
    
    // Functions   
    function calculateAge(dob: string | Date): number {
        const birthDate = typeof dob === "string" ? new Date(dob) : dob;
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }


    $: notificationPreference = $user.notifications;

    async function toggleNotifications() {
        const current = $user.notifications;
        const newValue = !current;

        // Saving notification preference
        await updateSettings({ notifications: newValue });
        // Updating preferences store
        preferences.update(p => {
            const newPreference = p.notificationPreference === $user.notifications ? false : true;
            sessionStorage.setItem('notificationPreference', newPreference.toString());
            return { ...p, notificationPreference: newPreference };
        });
        // Updating user store
        const userData = await getUser();
        user.set(userData);
    }

    async function saveChosenModules() {
        const payload = selectedModuleIds
            .map((id, index) => {
                if (!id) return null;

                return {
                    id: Number(id),
                    priority: index + 1,
                    enrolled: true
                };
            })
            .filter(
                (v): v is { id: number; priority: number; enrolled: boolean } => v !== null
            );

        // Saving chosen modules
        await updateChosenModules(payload);
        
        // Updating user store
        const userData = await getUser();
        user.set(userData);

        originalModuleIds = [...selectedModuleIds];  
    }

    function truncate(text: string, max = 50) {
        if (!text) return '';
        return text.length > max ? text.slice(0, max - 1) + '…' : text;
    }

    function redirectToEnquetePage() {
        goto('/enquete');
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
                    <h2 class="my-2 mx-auto text-2xl font-semibold">{$user.fullName}</h2>
                </div>
                <ul class="text-lg flex flex-col gap-2">
                    <li>
                        <strong>{$translations.age}:</strong> {age ?? '-'} {$translations.years_old}
                    </li>
                    <li>
                        <strong>{$translations.study}:</strong> {$user.course}
                    </li>
                    <li>
                        <strong>{$translations.study_counselor}:</strong> {$user.slber}
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
                            {#if $user?.chosenVKMs?.length}
                                <select
                                    id="electiveModule{index + 1}"
                                    class="block w-54 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) border-(--color-surface-alt)"
                                    bind:value={selectedModuleIds[index]}
                                >
                                    <!-- Placeholder -->
                                    <option value="" disabled>
                                        {$translations.select_module_placeholder}
                                    </option>

                                    {#each modules as module (module.id)}
                                        <option value={module.id}>
                                            {truncate(module.name, 40)}
                                        </option>
                                    {/each}
                                </select>
                            {/if}
                        </div>
                    {/each}
                    <div class="flex justify-between align-center mt-6 flex-wrap gap-6 sm:flex-nowrap sm:gap-16">
                        <button
                            type="button"
                            on:click={redirectToEnquetePage}
                            class="min-w-24 sm:min-w-w-32 px-4 py-2 rounded-md bg-(--color-accent) text-black opacity-100 cursor-pointer hover:scale-98 hover:opacity-75 duration-200 transition text-md">
                            {$translations.retake_survey}
                        </button>
                        <button
                            on:click={saveChosenModules}
                            disabled={!hasModuleChanges}
                            class="min-w-24 sm:min-w-w-32 px-4 py-2 rounded-md duration-200 transition
                            {hasModuleChanges
                                ? 'bg-(--color-accent) text-black opacity-100 cursor-pointer hover:scale-98 hover:opacity-75 text-md'
                                : 'bg-(--color-accent) text-black opacity-40 cursor-not-allowed'}"
                        >
                            {$translations.update_module_preferences}
                        </button>
                    </div>
                </form>
            </div>
            <!-- Settings -->
            <div class="flex flex-col col-span-2 col-start-6 flex-1 h-full w-full max-w-[500px] min-w-auto xl:min-w-[280px] xl:max-w-[450px] bg-(--color-surface) p-12 rounded-2xl shadow-md">
                <h2 class="text-xl font-semibold mb-4">{$translations.personal_settings}</h2>
                <!-- Language dropdown -->

                
                <form class="flex flex-row items-center justify-between w-full my-2 flex-wrap gap-2">
                    <label for="language" class="block text-md font-semibold w-full min-[430px]:w-auto min-[1280px]:w-full min-[1460px]:w-auto">{$translations.settings_language}</label>
                    <select bind:value={$preferences.language} id="language" class="block w-48 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) placeholder:text-body border-(--color-surface-alt)" on:change={(event) => event.target instanceof HTMLSelectElement && saveUserSetting({ language: event.target.value })}>
                        <option value="nl_NL">{$translations.dutch}</option>
                        <option value="en_US">{$translations.english}</option>
                    </select>
                </form>

                <!-- Font scale dropdown -->
                <form class="hidden xl:flex flex-row items-center justify-between w-full my-2 flex-wrap gap-2">
                    <label for="fontSize" class="block text-md font-semibold w-full min-[430px]:w-auto min-[1280px]:w-full min-[1460px]:w-auto">{$translations.settings_font_size}</label>
                    <select bind:value={$preferences.fontScale} id="fontSize" class="block w-48 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) placeholder:text-body border-(--color-surface-alt)" on:change={(event) => event.target instanceof HTMLSelectElement && saveUserSetting({ fontsize: Number(event.target.value) })}>
                        <option value={100}>100%</option>   
                        <option value={125}>125%</option>
                        <option value={150}>150%</option>
                    </select>
                </form>

                <!-- Theme dropdown -->
                <form class="flex flex-row items-center justify-between w-full my-2 flex-wrap gap-2">
                    <label for="theme" class="block text-md font-semibold w-full min-[430px]:w-auto min-[1280px]:w-full min-[1460px]:w-auto">{$translations.settings_theme}</label>
                    <select
                        bind:value={$preferences.theme} id="theme" class="block w-48 px-3 py-2.5 bg-(--color-surface-alt) border border-default-medium text-md rounded-lg focus:border-(--primary-color) placeholder:text-body border-(--color-surface-alt)" on:change={(event) => event.target instanceof HTMLSelectElement && saveUserSetting({ darkmode: event.target.value })}>
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
                        checked={notificationPreference === true}
                        on:change={toggleNotifications}
                    >
                    <div class="relative w-13 h-7 bg-(--color-surface-alt) rounded-full peer-checked:bg-(--color-hyperlink) after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
                </label>
            </div>
            <div class="flex xl:hidden flex-col items-center col-span-2 col-start-1 h-full w-full min-w-auto max-w-[500px] xl:min-w-[280px] xl:max-w-[450px] bg-(--color-surface) p-12 rounded-2xl shadow-md text-(--primary-color)">
                <h2 class="text-md text-center mb-4 text-(--color-border)">{$translations.logout_description}</h2>
                <button class="bg-(--color-accent) text-black px-4 py-2 rounded-md text-sm font-medium hover:opacity-75 hover:scale-98 transition duration-200 cursor-pointer">
                    {$translations.navigation.logout}
                </button>
            </div>
        </div>
    </div>
</div>
