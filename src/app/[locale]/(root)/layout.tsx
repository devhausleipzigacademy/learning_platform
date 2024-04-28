'use client';

import { CommandPalette } from '@/components/layout-navigation/commandPalette';
import useLinks from '@/components/layout-navigation/useLinks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import '@/styles/globals.css';

type ClientRootLayoutProps = {
  children: React.ReactNode;
};

// pull from envs
const devMode = true;

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  const links = useLinks();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000
          }
        }
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <CommandPalette links={links} />
        {/* {devMode && <ReactQueryDevtools initialIsOpen={false} />} */}
      </QueryClientProvider>
    </>
  );
}
