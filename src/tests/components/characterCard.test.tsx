import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { describe, it, expect, afterEach } from "vitest";

import CardsGroup from "@/components/cardsGroup";
import store from "@/redux/store";
import { unselectAllCharacters } from "@/redux/slices/selectedCharactersSlice";
import mockCharacters from "../mocks/mockCharacters";

import createMockRouter, { RouterProvider } from "../mocks/createMockRouter";

describe("CharacterCard", () => {
  const mockRouter = createMockRouter({});

  const renderFn = () =>
    render(
      <Provider store={store}>
        <RouterProvider router={mockRouter}>
          <CardsGroup characters={[mockCharacters[0]]} />
        </RouterProvider>
      </Provider>,
    );

  afterEach(() => {
    store.dispatch(unselectAllCharacters());
  });

  it("should render relevant card data", () => {
    renderFn();

    const name = screen.getByText(mockCharacters[0].name);
    expect(name).toHaveTextContent(mockCharacters[0].name);

    const status = screen.getByText(mockCharacters[0].status);
    expect(status).toHaveTextContent(mockCharacters[0].status);
  });

  it("should open card details on click", async () => {
    renderFn();

    const cardElement = screen.getByTestId("character-card");
    expect(cardElement).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(cardElement);

    expect(mockRouter.push).toHaveBeenCalledWith(
      { query: { detailedId: mockCharacters[0].id } },
      undefined,
      {
        scroll: false,
      },
    );
  });

  it("should add selected character on select button click", async () => {
    renderFn();

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent(/select/i);

    const user = userEvent.setup();
    await user.click(button);

    expect(store.getState().selectedCharacters.selectedCharacters.ids).toEqual([
      mockCharacters[0].id,
    ]);
  });

  it("should remove selected character if it is already selected on checkbox click", async () => {
    renderFn();

    const button = screen.getByRole("button", { name: /select/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(store.getState().selectedCharacters.selectedCharacters.ids).toEqual([
      mockCharacters[0].id,
    ]);

    await user.click(button);

    expect(store.getState().selectedCharacters.selectedCharacters.ids).toEqual(
      [],
    );
  });
});
