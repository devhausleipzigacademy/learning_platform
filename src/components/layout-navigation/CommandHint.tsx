"use client";

import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CommandHint() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    try {
      if (window) {
        const test = /mac/i.test(navigator.userAgent || navigator.platform);
        setIsMac(test);
      }
    } catch (error) {}
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            className="inline-flex items-center justify-center gap-1 text-black"
          >
            <span className="text-xs">{isMac ? "⌘" : "ctrl"}</span>
            <span>K</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-black">{`Press ${isMac ? "command" : "control"} and 'K' to open the command palette`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
