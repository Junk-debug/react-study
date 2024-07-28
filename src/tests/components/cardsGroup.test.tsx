import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CardsGroup from "../../pages/homePage/cardsGroup";
import mockCharacters from "../mocks/mockCharacters";
import store from "../../app/store";

describe("CardsGroup", () => {
  it("should render the specified number of cards", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <CardsGroup characters={mockCharacters} />
        </MemoryRouter>
      </Provider>,
    );

    const cardElements = screen.getAllByTestId("character-card");
    expect(cardElements.length).toBe(mockCharacters.length);
  });

  it("should render the specified text if array is empty", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CardsGroup characters={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
  });
});
