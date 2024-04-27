"use client";

import { CheckIcon, ChevronDownIcon, LanguagesIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localesByCode, SupportedLocale, supportedLocales } from "@/i18n";
import { cn } from "@/lib/style";
import { usePathname, useRouter } from "@/navigation";
import { useUIStore } from "@/stores/ui";

export default function LanguagePicker({
  className,
  placeholderText,
  noResultsText,
}: {
  className?: string;
  placeholderText: string;
  noResultsText: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocaleCode = useLocale() as SupportedLocale;

  const [open, setOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(
    localesByCode[currentLocaleCode],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="group">
        <PopoverTrigger asChild>
          <Button
            tabIndex={0}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[100px]", className)}
          >
            <span className="inline-flex items-center justify-around gap-2 overflow-hidden">
              <span
                className={cn(
                  "mr-2 transition-all duration-500",
                  open && "rotate-6 text-green-700",
                )}
              >
                <LanguagesIcon className="h-6 w-6" />
              </span>
            </span>
            <span className="ml-2 h-4 shrink-0">
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command className="relative max-h-[300px] overflow-hidden">
            {supportedLocales.length > 8 && (
              <>
                <CommandInput placeholder={placeholderText} />
                <CommandEmpty>{noResultsText}</CommandEmpty>
              </>
            )}
            <CommandGroup className="h-max overflow-auto">
              {Object.values(supportedLocales).map((supportedLocale) => {
                const locale = localesByCode[supportedLocale];

                return (
                  <CommandItem
                    className="flex justify-between hover:bg-black/10"
                    key={supportedLocale}
                    value={locale.label}
                    onSelect={() => {
                      setCurrentLocale(locale);
                      setOpen(false);
                      router.push(pathname, {
                        locale: supportedLocale,
                      });
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-[15%] flex-shrink-0",
                        currentLocale === locale ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="ml-[5%] flex-grow">
                      <span className="line-clamp-1 break-all">
                        {locale.label}
                      </span>
                    </span>
                    <span className="w-[15%] flex-shrink-0">{locale.icon}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}
