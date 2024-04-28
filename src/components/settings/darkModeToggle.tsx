"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
//@ts-ignore
import nightwind from "nightwind/helper";

import { Button } from "../ui/button";

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        tabIndex={0}
        variant="outline"
        className="text-dark-500 dark:text-light-500"
        onClick={() => {
          nightwind.beforeTransition();
          if (theme !== "dark") {
            setTheme("dark");
            //@ts-ignore
          } else if (theme !== "light") {
            setTheme("light");
          }
        }}
      >
        {theme === "dark" ? (
          <MoonIcon className="h-6 w-6" />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </Button>
    </>
  );
}
