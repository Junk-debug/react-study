// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardsGroup from "../../pages/homePage/cardsGroup";
import mockCharacters from "./mockCharacters";

describe("CardsGroup", () => {
  it("should render the specified number of cards", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <CardsGroup error={null} characters={mockCharacters} />,
      },
    ]);

    render(<RouterProvider router={router} />);

    const cardElements = screen.getAllByRole("img");
    expect(cardElements.length).toBe(mockCharacters.length);
  });

  it("should render the specified text if array is empty", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <CardsGroup error={null} characters={[]} />,
      },
    ]);

    const text = /nothing/i;

    render(<RouterProvider router={router} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
