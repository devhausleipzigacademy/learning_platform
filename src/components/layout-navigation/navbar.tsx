'use client';

import { useTranslations } from 'next-intl';
import LanguagePicker from '../settings/languagePicker';
import CommandHint from './CommandHint';
import ThemePicker from '../settings/darkModeToggle';
import Sparkles from '../ui/sparkles';

export default function Navbar() {
  const t = useTranslations();

  return (
    <>
      <nav className="border-dark flex w-full flex-grow flex-col items-center justify-center p-2">
        <div className="bg-slate-400 flex h-[10%] w-full items-center justify-center">
          <Sparkles>
            <div className="flex h-24 w-24 items-center justify-center">
              Logo
            </div>
          </Sparkles>
        </div>
        <div className="flex-grow"></div>
        <ul className="flex h-[10%] w-full items-center justify-around">
          <li>
            <LanguagePicker
              placeholderText={t('ui.languagePicker.placeholder')}
              noResultsText={t('ui.languagePicker.noResults')}
              ariaLabel={t('ui.languagePicker.aria')}
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
