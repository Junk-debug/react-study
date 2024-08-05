"use client";

import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../context/themeContext";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)")
      .matches
      ? "light"
      : "dark";

    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark") ?? preferredTheme;
    setTheme(storedTheme);
  }, []);

  const contextValue = useMemo(() => {
    const toggleTheme = () => {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return newTheme;
      });
    };

    return { toggleTheme, currentTheme: theme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
