import { Inter } from "next/font/google";
import { useThemeContext } from "../context/themeContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentTheme } = useThemeContext();
  return (
    <main
      data-theme={currentTheme}
      className={`transition-colors min-h-screen bg-white text-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 ${inter.className}`}
    >
      {children}
    </main>
  );
}
