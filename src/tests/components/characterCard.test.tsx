/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CharacterCard from "../../pages/homePage/characterCard";
import mockCharacters from "./mockCharacters";
import CharacterPage from "../../pages/characterPage/characterPage";

describe("CharacterCard", () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <CharacterCard character={mockCharacters[0]} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/character/:id",
          element: (
            <div>
              <button type="button">Close</button>
              <CharacterPage />
            </div>
          ),
        },
      ],
    },
  ]);

  it("should render relevant card data", () => {
    render(<RouterProvider router={router} />);

    const name = screen.getByText(mockCharacters[0].name);
    expect(name).toHaveTextContent(mockCharacters[0].name);

    const status = screen.getByText(mockCharacters[0].status);
    expect(status).toHaveTextContent(mockCharacters[0].status);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockCharacters[0].image);
  });

  it("should open card details on click", () => {
    render(<RouterProvider router={router} />);

    const cardElement = screen.getByText(mockCharacters[0].name);

    const user = userEvent.setup();
    user.click(cardElement);

    const closeButton = screen.getByRole("button");

    expect(closeButton).toBeInTheDocument();
  });
});
