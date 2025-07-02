'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { 
  locales, 
  localeNames, 
  localeFlags, 
  getLocaleFromUrl, 
  addLocaleToUrl, 
  removeLocaleFromUrl,
  type Locale 
} from '@/lib/i18n';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromUrl(pathname);

  const switchLocale = (newLocale: Locale) => {
    const cleanPath = removeLocaleFromUrl(pathname);
    const newPath = addLocaleToUrl(cleanPath, newLocale);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {localeFlags[currentLocale]} {localeNames[currentLocale]}
          </span>
          <span className="sm:hidden">
            {localeFlags[currentLocale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className={`gap-2 ${
              locale === currentLocale ? 'bg-accent' : ''
            }`}
          >
            <span>{localeFlags[locale]}</span>
            <span>{localeNames[locale]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
