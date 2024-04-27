"use client";

import { CommandPalette } from "@/components/layout-navigation/commandPalette";
import useLinks from "@/components/layout-navigation/useLinks";
import { SupportedLocale } from "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

import "@/styles/globals.css";
import Navbar from "@/components/layout-navigation/navbar";

type ClientRootLayoutProps = {
  children: React.ReactNode;
};

const devMode = true;

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
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
          {/* {devMode && <ReactQueryDevtools initialIsOpen={false} />} */}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
