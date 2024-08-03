import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import NotFoundPage from "@/pages/404";
import createMockRouter, { RouterProvider } from "../mocks/createMockRouter";

describe("NotFoundPage", () => {
  const router = createMockRouter({ asPath: "/404" });
  const renderFn = () =>
    render(
      <RouterProvider router={router}>
        <NotFoundPage />
      </RouterProvider>,
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

  it("should change route to '/' on button click", async () => {
    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(router.push).toHaveBeenCalledWith("/");
  });
});
