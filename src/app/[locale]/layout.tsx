import { SupportedLocale } from "@/i18n";
import pick from "just-pick";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { cn } from "@/lib/style";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface ServerRootLayoutProps {
  params: { locale: SupportedLocale };
  children: React.ReactNode & {
    props: ServerRootLayoutProps["params"];
  };
}

const devMode = true;

export default function ServerRootLayout({
  children,
  params,
}: ServerRootLayoutProps) {
  const { locale } = params;
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={devMode}>
      <body
        className={cn(
          "bg-light dark:bg-dark text-dark dark:text-light flex h-full min-h-screen flex-col items-center justify-center font-sans antialiased",
          inter.variable,
        )}
      >
        <NextIntlClientProvider
          messages={pick(messages, ["UI"])}
          locale={locale}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
