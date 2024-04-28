'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

export default function ThemePicker() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        tabIndex={0}
        variant="outline"
        className="light:text-dark light:bg-light dark:text-light dark:bg-dark"
        aria-label={
          theme === 'dark'
            ? t('ui.themePicker.themeMap.light.aria')
            : t('ui.themePicker.themeMap.dark.aria')
        }
        onClick={() => {
          if (theme !== 'dark') {
            setTheme('dark');
            //@ts-ignore
          } else if (theme !== 'light') {
            setTheme('light');
          }
        }}
      >
        {theme === 'dark' ? (
          <MoonIcon
            aria-label={t('ui.themePicker.themeMap.dark.label')}
            className="h-6 w-6"
          />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </Button>
    </>
  );
}
