"use client";

import Flyout from "@/app/characters/flyout";
import ThemeToggler from "@/components/themeToggler";
import Button from "@/components/ui/button";
import { useThemeContext } from "@/context/themeContext";
import useTestError from "@/hooks/useTestError";

function Layout({ children }: { children: React.ReactNode }) {
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

export default function CharactersLayout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  const { throwTestError } = useTestError();
  return (
    <Layout>
      <div className="flex">
        <div className="mx-auto w-full py-8 px-4 max-w-5xl flex flex-col gap-6">
          <div className="flex flex-row-reverse items-center justify-between">
            <Button variant="destructive" onClick={throwTestError}>
              Throw error
            </Button>

            <ThemeToggler />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Rick and Morty characters
          </h1>
          {children}
          <Flyout />
        </div>
        {details}
      </div>
    </Layout>
  );
}
