"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { localesByCode, SupportedLocale, supportedLocales } from "@/i18n";
import { usePathname, useRouter } from "@/navigation";
import { useUIStore } from "@/stores/ui";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavLinks } from "./useLinks";
import { useTheme } from "next-themes";
import {
  ArrowDownRightIcon,
  LanguagesIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";

type CommandPaletteProps = {
  links: NavLinks;
};

export function CommandPalette({ links }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocaleCode = useLocale() as SupportedLocale;
  const theme = useTheme();

  const [_, setCurrentLocale] = useState(localesByCode[currentLocaleCode]);
  const [cmdShow, setCmdShow] = useState(false);

  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<Array<string>>([]);
  const page = pages[pages.length - 1];

  const { setVisibilities } = useUIStore((state) => ({
    setVisibilities: state.setVisibilities,
  }));

  useEffect(() => {
    setSearch("");
  }, [pages]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdShow(true);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  function determineInclusion(pageName: string) {
    return (!page && search !== "") || (page && page === pageName);
  }

  return (
    <Dialog open={cmdShow} onOpenChange={setCmdShow}>
      <DialogContent className="h-[50vh] w-[50vw] p-0">
        <Command
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "ArrowLeft") {
              // allow escape key to close the modal if there are no pages
              if (pages.length > 0) {
                e.preventDefault();
              }

              setPages((pages) => pages.slice(0, -1));
            }
          }}
        >
          <CommandInput value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {!page && search === "" && (
              <>
                <CommandGroup heading="Shortcut Groups">
                  <CommandItem
                    onSelect={() => setPages((pages) => [...pages, "settings"])}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() =>
                      setPages((pages) => [...pages, "navigation"])
                    }
                  >
                    <ArrowDownRightIcon className="mr-2 h-4 w-4" />
                    <span>Navigation</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}

            {determineInclusion("settings") && (
              <>
                <CommandGroup heading="Settings">
                  <CommandItem
                    onSelect={() => setPages((pages) => [...pages, "language"])}
                  >
                    <LanguagesIcon className="mr-2 h-4 w-4" />
                    <span>Language</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setPages((pages) => [...pages, "theme"])}
                  >
                    {theme.theme === "dark" ? (
                      <MoonIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <SunIcon className="mr-2 h-4 w-4" />
                    )}
                    <span>Theme</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}

            {determineInclusion("theme") && (
              <>
                <CommandGroup heading="Theme">
                  <CommandItem
                    onSelect={() => {
                      theme.setTheme("dark");
                      setCmdShow(false);
                      setPages([]);
                    }}
                  >
                    <MoonIcon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      theme.setTheme("light");
                      setCmdShow(false);
                      setPages([]);
                    }}
                  >
                    <SunIcon className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}

            {determineInclusion("language") && (
              <>
                <CommandGroup heading="Language">
                  {Object.values(supportedLocales).map((supportedLocale) => {
                    const locale = localesByCode[supportedLocale];

                    return (
                      <CommandItem
                        key={supportedLocale}
                        onSelect={() => {
                          setCurrentLocale(locale);
                          router.push(pathname, {
                            locale: supportedLocale,
                          });
                          setCmdShow(false);
                          setPages([]);
                        }}
                      >
                        <span className="mr-2 h-4 w-4">{locale.icon}</span>
                        <span>{locale.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}

            {determineInclusion("navigation") && (
              <>
                {links.locations.length > 0 && (
                  <CommandGroup heading="Navigation">
                    {links.locations.map((link) => {
                      return (
                        <CommandItem
                          key={link.intlAnchor}
                          onSelect={() => {
                            setVisibilities((visibilities) => {
                              return {
                                anchors: [
                                  link.intlAnchor,
                                  ...visibilities.anchors,
                                ],
                              };
                            });
                            router.push(
                              link.href +
                                `${link.type === "withAnchor" ? "#" + link.intlAnchor : ""}`,
                            );
                            setCmdShow(false);
                            setPages([]);
                          }}
                        >
                          <ArrowDownRightIcon className="mr-2 h-4 w-4" />
                          <span>{link.text}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
