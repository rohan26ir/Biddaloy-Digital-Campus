"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* ==================== DESKTOP + TABLET (Dropdown) ==================== */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-xl">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ==================== MOBILE (Side by Side Toggle) ==================== */}
      <div className="md:hidden flex bg-muted rounded-xl p-1">
        <button
          onClick={() => setTheme("light")}
          className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-all ${
            theme === "light"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sun size={18} />
          Light
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-sm font-medium transition-all ${
            theme === "dark"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Moon size={18} />
          Dark
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-all ${
            theme === "system"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Monitor size={18} />
          System
        </button>
      </div>
    </>
  );
}