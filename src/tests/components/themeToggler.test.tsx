import { render, screen } from "@testing-library/react";

import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ThemeToggler from "../../components/themeToggler";
import { ThemeContext } from "../../context/themeContext";

describe("ThemeToggler", () => {
  const mockToggleTheme = vi.fn();

  const renderComponent = (theme: "light" | "dark") => {
    return render(
      <ThemeContext.Provider
        value={{ currentTheme: theme, toggleTheme: mockToggleTheme }}
      >
        <ThemeToggler />
      </ThemeContext.Provider>,
    );
  };

  it("should render theme toggler with correct initial theme (dark)", () => {
    renderComponent("dark");

    const themeToggler = screen.getByRole("switch");

    expect(themeToggler).toBeInTheDocument();
    expect(themeToggler).toBeChecked();
  });

  it("should render theme toggler with correct initial theme (light)", () => {
    renderComponent("light");

    const themeToggler = screen.getByRole("switch");

    expect(themeToggler).toBeInTheDocument();
    expect(themeToggler).not.toBeChecked();
  });

  it('should call "toggleTheme" on click', async () => {
    renderComponent("light");

    const themeToggler = screen.getByRole("switch");
    const user = userEvent.setup();
    await user.click(themeToggler);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
