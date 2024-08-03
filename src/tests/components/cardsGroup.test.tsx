import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { Provider } from "react-redux";
import CardsGroup from "@/components/cardsGroup";
import store from "@/redux/store";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import mockCharacters from "../mocks/mockCharacters";
import createMockRouter, { RouterProvider } from "../mocks/createMockRouter";

describe("CardsGroup", () => {
  it("should render the specified number of cards", () => {
    render(
      <RouterProvider router={createMockRouter({})}>
        <Provider store={store}>
          <CardsGroup characters={mockCharacters} />
        </Provider>
      </RouterProvider>,
    );

    const cardElements = screen.getAllByTestId("character-card");
    expect(cardElements.length).toBe(mockCharacters.length);
  });

  it("should render the specified text if array is empty", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <CardsGroup characters={[]} />
      </RouterContext.Provider>,
    );

    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
  });
});
