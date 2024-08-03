import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ThemeProvider from "@/components/themeProvider";
import { useThemeContext } from "@/context/themeContext";

describe("ThemeProvider", () => {
  const localStorageSpy = vi.spyOn(Storage.prototype, "setItem");
  const localStorageGetSpy = vi.spyOn(Storage.prototype, "getItem");

  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? "light"
    : "dark";

  const localStorageKey = "theme";

  beforeEach(() => {
    localStorage.clear();
  });

  it("should set initial theme to user preference if localStorage is empty", () => {
    const TestComponent = () => {
      const { currentTheme } = useThemeContext();
      return <span>{currentTheme}</span>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText(preferredTheme)).toBeInTheDocument();
  });

  it('should save theme to localStorage on "toggleTheme"', async () => {
    const TestComponent = () => {
      const { currentTheme, toggleTheme } = useThemeContext();
      return (
        <>
          <span data-testid="current-theme">{currentTheme}</span>
          <button type="button" onClick={() => toggleTheme()}>
            Toggle
          </button>
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const currentTheme = screen.getByTestId("current-theme");
    const newTheme = preferredTheme === "light" ? "dark" : "light";

    expect(currentTheme).toHaveTextContent(preferredTheme);

    const toggleButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(toggleButton);

    expect(localStorageSpy).toHaveBeenCalledWith(localStorageKey, newTheme);
  });

  it("should get saved value on component mount", () => {
    const theme = "dark";

    const TestComponent = () => {
      const { currentTheme } = useThemeContext();
      return <span>{currentTheme}</span>;
    };

    localStorage.setItem(localStorageKey, theme);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(localStorageGetSpy).toHaveBeenCalledWith(localStorageKey);
    expect(screen.getByText(theme)).toBeInTheDocument();
  });
});
