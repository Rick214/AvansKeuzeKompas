import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import nl_NL from '../i18n/nl_NL.json';
import en_US from '../i18n/en_US.json';
import { user } from './auth';
import { vkms } from './vkm';

export type FontScale = 100 | 125 | 150 | 175 | 200; // Supported font scales
export type Language = 'nl_NL' | 'en_US'; // Supported languages
export type Theme = 'light' | 'dark' | 'system'; // Supported themes
export type NotificationPreference = true | false; // Notification preferences

export type Preferences = {
  language: Language;
  fontScale: FontScale;
  theme: Theme;
  notificationPreference: NotificationPreference;
};

// Indicates that preferences have been loaded and applied
export const ready = writable(false);

// Holds the current translations based on language
export const translations = writable(nl_NL);

// Central preferences store
export const preferences = writable<Preferences>({
  language: 'nl_NL',
  fontScale: 100,
  theme: 'system',
  notificationPreference: false,
});

let currentUser: any = null;
user.subscribe(u => currentUser = u);

user.subscribe((u) => {
  if (u) {
    preferences.update((p) => ({
      ...p,
      language: (u.language as Language) ?? 'nl_NL',
      fontScale: (u.fontsize as FontScale) ?? 100,
      theme: (u.darkmode as Theme) ?? 'system',
      notificationPreference: u.notifications ?? true
    }));
  }
});
// Map of translations for easy lookup
const translationMap = { nl_NL, en_US };

// ---------------------------
// Browser initialization
// ---------------------------
if (browser) {
  // Load saved preferences from sessionStorage
  const savedLang = sessionStorage.getItem('language') as Language;
  const savedScale = sessionStorage.getItem('fontScale') as string;
  const savedTheme = sessionStorage.getItem('theme') as Theme;
  const savedNotificationPreference = sessionStorage.getItem('notificationPreference') as unknown as NotificationPreference;

  // Apply saved preferences
  preferences.update(p => ({
    language: savedLang || (p.language ?? 'nl_NL'),
    fontScale: savedScale ? Number(savedScale) as FontScale : (p.fontScale ?? 100),
    theme: savedTheme || (p.theme ?? 'system'),
    notificationPreference: savedNotificationPreference || (p.notificationPreference ?? true)
  }));

  let systemListener: { mq: MediaQueryList; handler: (e: MediaQueryListEvent) => void } | null = null;

  // Subscribe to live updates
  preferences.subscribe(async (p) => {
    // Language & translations
    translations.set(translationMap[p.language as Language]);
    sessionStorage.setItem('language', p.language);

    // Font scale
    document.documentElement.style.setProperty('--font-scale', `${p.fontScale/100}`);
    sessionStorage.setItem('fontScale', p.fontScale.toString());

    // Theme (light / dark / system)
    const html = document.documentElement;

    // Remove previous classes
    html.classList.remove('dark', 'light');

    // Remove previous system listener if any
    if (systemListener) {
      systemListener.mq?.removeEventListener('change', systemListener.handler);
      systemListener = null;
    }

    // Apply theme
    if (p.theme === 'system') {
      const mq = globalThis.matchMedia('(prefers-color-scheme: dark)');

      // Set initial system theme
      html.classList.toggle('dark', mq.matches);
      html.classList.toggle('light', !mq.matches);

      // Add listener for live system changes
      const handler = (e: MediaQueryListEvent) => {
        html.classList.toggle('dark', e.matches);
        html.classList.toggle('light', !e.matches);
      };
      mq.addEventListener('change', handler);

      systemListener = { mq, handler }; // store both to remove later

    } else {
      // Manual chosen theme → ignores system
      html.classList.toggle('dark', p.theme === 'dark');
      html.classList.toggle('light', p.theme === 'light');
      systemListener = null;
    }

    sessionStorage.setItem('theme', p.theme);

    // Ready flag
    ready.set(true);
  });
}
