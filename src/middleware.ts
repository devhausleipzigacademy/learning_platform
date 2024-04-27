import createMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, supportedLocales } from './i18n';

/**
 * @link https://next-intl-docs.vercel.app/docs/routing/middleware
 */
export default createMiddleware({
  localePrefix: localePrefix,
  locales: supportedLocales,
  defaultLocale: defaultLocale,
  localeDetection: true,
  alternateLinks: true
});

// can't use this because Nextjs doesn't support non-static matching pattern strings in the config object; have to manually add the supported locales as static string below
const localizedPaths = supportedLocales.map((locale) => {
  return `/${locale}/:path*`;
});

export const config = {
  matcher: ['/', `/(de|en-GB)/:path*`]
};
