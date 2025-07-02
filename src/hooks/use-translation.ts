'use client';

import { usePathname } from 'next/navigation';
import { Locale, getLocaleFromUrl, defaultLocale } from '@/lib/i18n';
import { uz } from '@/lib/translations/uz';
import { ru } from '@/lib/translations/ru';
import { en } from '@/lib/translations/en';

const translations = {
  uz,
  ru,
  en,
};

type TranslationKeys = typeof uz;

export function useTranslation() {
  const pathname = usePathname();
  const locale = getLocaleFromUrl(pathname);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale] || translations[defaultLocale];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // Fallback to default locale if translation not found
    if (value === undefined) {
      value = translations[defaultLocale];
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }
    
    return value || key;
  };

  return {
    t,
    locale,
    translations: translations[locale] || translations[defaultLocale],
  };
}

// Type-safe translation function
export function createTypedTranslation<T extends Record<string, any>>(translations: T) {
  return function useTypedTranslation() {
    const pathname = usePathname();
    const locale = getLocaleFromUrl(pathname);
    
    return {
      t: translations[locale] || translations[defaultLocale],
      locale,
    };
  };
}
