export const i18nConfig = {
    locales: ['en-us', 'es'],
    otherLocales: ['es'],
    defaultLocale: 'en-us',
    basePath: '/locations'
  };
  
  export type Locale = (typeof i18nConfig)['locales'][number]