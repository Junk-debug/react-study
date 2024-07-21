import { useMemo, useState } from "react";
import { ThemeContext } from "../context/themeContext";

// TODO: add tests

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? "light"
    : "dark";

  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") ?? preferredTheme,
  );

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
