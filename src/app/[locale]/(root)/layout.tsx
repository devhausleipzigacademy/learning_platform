"use client";

import { CommandPalette } from "@/components/layout-navigation/commandPalette";
import useLinks from "@/components/layout-navigation/useLinks";
import ProvidersClient from "@/components/providersClient";
import { SupportedLocale } from "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

type ClientRootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: SupportedLocale;
  };
};

export default function ClientRootLayout({
  children,
  params: { locale },
}: ClientRootLayoutProps) {
  const links = useLinks();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
          <CommandPalette links={links} />
        </ThemeProvider>
        {/* make dependent on dev mode */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
