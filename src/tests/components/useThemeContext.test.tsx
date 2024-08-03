import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ThemeContext, useThemeContext } from "@/context/themeContext";

describe("useThemeContext", () => {
  it("should throw error if used outside ThemeProvider", () => {
    const TestComponent = () => {
      const { currentTheme } = useThemeContext();
      return <span>{currentTheme}</span>;
    };

    expect(() => render(<TestComponent />)).toThrowError(
      /have to be used only in ThemeProvider/i,
    );
  });

  it("should return current theme and toggle theme function", async () => {
    const mockToggleTheme = vi.fn();
    const theme = "light";

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
      <ThemeContext.Provider
        value={{ currentTheme: theme, toggleTheme: mockToggleTheme }}
      >
        <TestComponent />
      </ThemeContext.Provider>,
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent(theme);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
