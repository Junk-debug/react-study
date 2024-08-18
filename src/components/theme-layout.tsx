"use client";

import { useThemeContext } from "@/context/themeContext";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentTheme } = useThemeContext();
  return (
    <main
      data-theme={currentTheme}
      className="transition-colors min-h-screen bg-white text-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {children}
    </main>
  );
}
