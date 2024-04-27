"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

type ProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function ProvidersClient({ children }: ProviderProps) {
  return <></>;
}
