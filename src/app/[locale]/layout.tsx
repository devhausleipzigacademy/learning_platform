import ProvidersClient from '@/components/providersClient';
import { SupportedLocale } from '@/i18n';
import '@/styles/globals.css';
import pick from 'just-pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata = {
  title: 'Devhaus Learning Platform',
  description: 'Devhaus Learning Platform',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: SupportedLocale };
}) {
  const messages = useMessages();
  
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextIntlClientProvider
          messages={pick(messages, ["UI"])}
          locale={locale}
        > 
          <ProvidersClient>
            {children}
          </ProvidersClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
