import { CommandPalette } from "@/components/layout-navigation/commandPalette";
import useLinks from "@/components/layout-navigation/useLinks";
import ProvidersClient from "@/components/providersClient";
import { SupportedLocale } from "@/i18n";
import { cn } from "@/lib/style";
import "@/styles/globals.css";
import pick from "just-pick";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Devhaus Learning Platform",
  description: "The Devhaus Learning Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: SupportedLocale };
}) {
  const messages = useMessages();
  const links = useLinks();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "bg-offwhite flex min-h-screen flex-col items-center justify-center font-sans antialiased",
          inter.variable,
        )}
      >
        <NextIntlClientProvider
          messages={pick(messages, ["UI"])}
          locale={locale}
        >
          <ProvidersClient>
            {children}
            <CommandPalette links={links} />
          </ProvidersClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
