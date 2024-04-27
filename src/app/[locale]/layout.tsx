import { SupportedLocale } from "@/i18n";
import { cn } from "@/lib/style";
import "@/styles/globals.css";
import pick from "just-pick";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Inter } from "next/font/google";
import { cloneElement, isValidElement } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Devhaus Learning Platform",
  description: "The Devhaus Learning Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface ServerRootLayoutProps {
  params: { locale: SupportedLocale };
  children: React.ReactNode & {
    props: ServerRootLayoutProps["params"];
  };
}

export default function ServerRootLayout({
  children,
  params,
}: ServerRootLayoutProps) {
  const { locale } = params;
  const messages = useMessages();

  return (
    <html lang={locale}>
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
          {isValidElement(children)
            ? cloneElement(children, { params })
            : children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
