import { writable } from 'svelte/store';
import nl_NL from './nl_NL.json';
import en_US from './en_US.json';

export type TranslationKeys = {
  welcome_title: string;
  welcome_message: string;
};

export const translations = writable<TranslationKeys>({
  welcome_title: '',
  welcome_message: '',
});

export const language = writable<'nl_NL' | 'en_US'>('nl_NL');

const translationMap = {
  nl_NL,
  en_US
};

export function loadTranslations(lang: 'nl_NL' | 'en_US') {
  translations.set(translationMap[lang]);
}

language.subscribe(async (lang) => {
  loadTranslations(lang);
});
