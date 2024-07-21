import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CardsGroup from "../../pages/homePage/cardsGroup";
import mockCharacters from "../mocks/mockCharacters";

describe("CardsGroup", () => {
  it("should render the specified number of cards", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CardsGroup error={null} characters={mockCharacters} />
      </MemoryRouter>,
    );

    const cardElements = screen.getAllByTestId("character-card");
    expect(cardElements.length).toBe(mockCharacters.length);
  });

  it("should render the specified text if array is empty", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CardsGroup error={null} characters={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
  });
});
