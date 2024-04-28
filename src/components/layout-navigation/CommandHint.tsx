'use client';

import { useEffect, useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import useCheckIfMac from '@/lib/hooks/useCheckIfMac';

export default function CommandHint() {
  const t = useTranslations();
  const isMac = useCheckIfMac();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          tabIndex={0}
          className="text-info inline-flex items-center justify-center gap-1"
        >
          <span>
            <span className="text-xs">{isMac ? '⌘' : 'ctrl'}</span>
            <span>K</span>
          </span>
        </TooltipTrigger>
        <TooltipContent className="dark:text-dark dark:bg-light light:text-light light:bg-dark rounded-md px-2 py-1">
          <p>{t('ui.commandPalette.hint', { symbol: isMac ? '⌘' : 'ctrl' })}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
