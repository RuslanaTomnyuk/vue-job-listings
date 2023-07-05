import { createI18n } from 'vue-i18n';
import { DEFAULT_LOCALE } from './configs.ts'
import en from '@/configs/i18n/locales/en-US.json';
import ukr from '@/configs/i18n/locales/ukr-UKR.json'

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, ukr },
});

export default i18n
