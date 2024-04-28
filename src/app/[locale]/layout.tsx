import { SupportedLocale } from '@/i18n';
import pick from 'just-pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { cn } from '@/lib/style';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { defaultLocaleText } from '@/i18n';

import { UnionToTuple } from '@/lib/typing';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const themeMap = defaultLocaleText.ui.themePicker.themeMap;
export const supportedThemes = Object.keys(themeMap) as unknown as UnionToTuple<
  keyof typeof themeMap
>;

interface ServerRootLayoutProps {
  params: { locale: SupportedLocale };
  children: React.ReactNode & {
    props: ServerRootLayoutProps['params'];
  };
}

// pull from envs
const devMode = true;

export default function ServerRootLayout({
  children,
  params
}: ServerRootLayoutProps) {
  const { locale } = params;
  const messages = useMessages();

  return (
    <html
      className={cn(devMode && 'debug-screens')}
      lang={locale}
      suppressHydrationWarning={devMode}
    >
      <body
        className={cn(
          'light:text-dark light:bg-light dark:text-light dark:bg-dark flex h-full min-h-screen flex-col items-center justify-center font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          enableSystem
          enableColorScheme
          attribute="class"
          themes={supportedThemes}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
