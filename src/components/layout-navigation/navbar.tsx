"use client";

import { useTranslations } from "next-intl";
import LanguagePicker from "../settings/languagePicker";
import CommandHint from "./CommandHint";
import ThemePicker from "../settings/darkModeToggle";
import Image from "next/image";
import devhausLogo from "@assets/images/devhaus-logo.svg";

export default function Navbar() {
  const t = useTranslations("UI");

  return (
    <>
      <nav className="border-dark flex w-full flex-grow flex-col items-center justify-center border">
        <div className="flex h-[10%] w-full items-center justify-center bg-slate-400">
          <div className="h-24 w-24">
            <Image
              className="text-dark-500 dark:text-light-500 fill-dark-500 dark:fill-light-500 !stroke-dark-500 dark:stroke-light-500"
              src={devhausLogo}
              alt="Logo of Devhaus Leipzig"
            />
          </div>
        </div>
        <div className="flex-grow"></div>
        <ul className="flex h-[10%] w-full items-center justify-around">
          <li>
            <LanguagePicker
              placeholderText={t("languagePicker.placeholder")}
              noResultsText={t("languagePicker.noResults")}
            />
          </li>
          <li>
            <ThemePicker />
          </li>
          <CommandHint />
        </ul>
      </nav>
    </>
  );
}
