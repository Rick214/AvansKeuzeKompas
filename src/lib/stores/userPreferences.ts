import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import nl_NL from '../i18n/nl_NL.json';
import en_US from '../i18n/en_US.json';

export type FontScale = 100 | 125 | 150 | 175 | 200;
export type Language = 'nl_NL' | 'en_US';

export type Preferences = {
  language: Language;
  fontScale: FontScale;
};

export const ready = writable(false);
export const translations = writable(nl_NL);

export const preferences = writable<Preferences>({
  language: 'nl_NL',
  fontScale: 100
});

const translationMap = { nl_NL, en_US };

if (browser) {
  const savedLang = sessionStorage.getItem('language') as Language;
  const savedScale = sessionStorage.getItem('fontScale') as string;

  preferences.update(p => ({
    language: savedLang || p.language,
    fontScale: savedScale ? Number(savedScale) as FontScale : p.fontScale
  }));

  // subscribe for live updates
  preferences.subscribe(p => {
    
    // translations
    translations.set(translationMap[p.language]);
    sessionStorage.setItem('language', p.language);

    // font-scale
    document.documentElement.style.setProperty('--font-scale', `${p.fontScale/100}`);
    sessionStorage.setItem('fontScale', p.fontScale.toString());

    // ready
    ready.set(true);
  });
}
