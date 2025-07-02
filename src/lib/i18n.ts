export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'uz';

export const localeNames: Record<Locale, string> = {
  uz: 'O\'zbekcha',
  ru: 'Русский',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  uz: '🇺🇿',
  ru: '🇷🇺',
  en: '🇺🇸',
};

export function getLocaleFromUrl(pathname: string): Locale {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

export function removeLocaleFromUrl(pathname: string): string {
  const segments = pathname.split('/');
  if (locales.includes(segments[1] as Locale)) {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
}

export function addLocaleToUrl(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromUrl(pathname);
  if (locale === defaultLocale) {
    return cleanPath || '/';
  }
  return `/${locale}${cleanPath}`;
}
