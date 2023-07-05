import i18n from '@/configs/i18n/i18n.ts';

export enum NewLocale {
  en = 'en',
  ukr = 'ukr'
}

const translation = {
  get supportedLocales(): string[] {
    return [ 'en', 'ukr' ];
  },

  set currentLocale(newLocale: NewLocale) {
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale: NewLocale) {
    translation.currentLocale = newLocale;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('html').setAttribute('lang', newLocale)
    localStorage.setItem('user-locale', newLocale)
  }
}

export default translation;
