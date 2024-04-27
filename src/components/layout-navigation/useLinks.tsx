// @ts-nocheck
"use client";

import { useTranslations } from "next-intl";
import { NavLink, linksConfig } from "./links";

export default function useLinks() {
  const t = useTranslations();

  const locationLinks = linksConfig.location.map((link) => {
    return {
      type: "withAnchor",
      href: link.href,
      text: t(link.textKey),
      intlAnchorKey: link.intlAnchorKey,
      intlAnchor: t(link.intlAnchorKey),
    } as const;
  });

  return {
    locations: [...locationLinks],
  } as const satisfies Record<string, NavLink[]>;
}

export type NavLinks = ReturnType<typeof useLinks>;
