import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import NotFoundPage from "../../pages/notFountPage";

describe("NotFoundPage", () => {
  const renderFn = () =>
    render(
      <MemoryRouter initialEntries={["/some-path"]}>
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

  it("should display the correct text", () => {
    renderFn();

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('should show "Go home" button', () => {
    renderFn();

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/go home/i);
  });

  it("should redirect to the home page on click", async () => {
    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(window.location.pathname).toBe("/");
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
