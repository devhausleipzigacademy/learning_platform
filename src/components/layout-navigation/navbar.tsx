"use client";

import { useTranslations } from "next-intl";
import LanguagePicker from "./languagePicker";
import CommandHint from "./CommandHint";

export default function Navbar() {
  const t = useTranslations("UI");

  return (
    <>
      <nav className="border-dark flex w-full flex-grow flex-col items-center justify-center border">
        <div className="w-full flex-grow bg-slate-400"></div>
        <ul className="flex h-[10%] w-full items-center justify-around">
          <li>
            <LanguagePicker
              placeholderText={t("languagePicker.placeholder")}
              noResultsText={t("languagePicker.noResults")}
            />
          </li>
          <CommandHint />
        </ul>
      </nav>
    </>
  );
}
