import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { type Locale as Localizer } from 'date-fns';
import { de, enGB } from 'date-fns/locale';
import index from 'just-index';
import { type useTranslations } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import text_enGB from '@assets/locales/en-GB.json';

import { type UnionToIntersection } from '@/lib/typing';

// typing pulled from default locale file
export type validTranslationKeys = Parameters<typeof useTranslations>[0];

type Locale = {
  locale: string;
  label: string;
  icon: string | (<P>(props: P) => JSX.Element);
  localizer: Localizer;
};

const locales = [
  {
    label: 'Deutsch',
    locale: 'de',
    icon: getUnicodeFlagIcon('DE'),
    localizer: de
  },
  {
    label: 'English',
    locale: 'en-GB',
    icon: getUnicodeFlagIcon('GB'),
    localizer: enGB
  }
] as const;

type LocalesToCodes<T extends Readonly<Array<Locale>>> = UnionToIntersection<{
  [K in keyof T]: T[K]['locale'];
}>;

export const supportedLocales = locales.map(
  ({ locale }) => locale
) as unknown as LocalesToCodes<typeof locales>;

export type SupportedLocale = (typeof supportedLocales)[number];

////////////////////////

// Manually ensure these match
export const defaultLocale: SupportedLocale = 'en-GB';
export const defaultLocaleText = text_enGB;

////////////////////////

export const isSupportedLocale = (
  locale: string
): locale is SupportedLocale => {
  return supportedLocales.includes(locale as any);
};

type LocalesToKeyedDict<T extends Readonly<Array<Locale>>> =
  UnionToIntersection<
    {
      [K in keyof T]: Record<T[K]['locale'], T[K]>;
    }[number]
  >;

export const localesByCode = index(locales, 'locale') as LocalesToKeyedDict<
  typeof locales
>;

export type LocalePrefix = 'as-needed' | 'always' | 'never';
export const localePrefix: LocalePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
  if (!isSupportedLocale(locale)) notFound();

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default
  };
});
