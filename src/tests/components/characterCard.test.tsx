import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import {
  describe,
  it,
  expect,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from "vitest";

import DetailedCharacter from "../../pages/detailedCharacter/detailedCharacter";
import mockCharacters from "../mocks/mockCharacters";
import CardsGroup from "../../pages/homePage/cardsGroup";
import store from "../../app/store";
import server from "../mocks/server";
import apiSlice from "../../api/api";
import { mockGetCharacterById } from "../mocks/handlers";

describe("CharacterCard", () => {
  const renderFn = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CardsGroup characters={[mockCharacters[0]]} />
                  <Outlet />
                </>
              }
            >
              <Route path="character/:id" element={<DetailedCharacter />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  };

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
    store.dispatch(apiSlice.util.resetApiState());
  });

  afterAll(() => server.close());

  it("should render relevant card data", () => {
    renderFn();

    const name = screen.getByText(mockCharacters[0].name);
    expect(name).toHaveTextContent(mockCharacters[0].name);

    const status = screen.getByText(mockCharacters[0].status);
    expect(status).toHaveTextContent(mockCharacters[0].status);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockCharacters[0].image);
  });

  it("should open card details on click", async () => {
    renderFn();

    const cardElement = screen.getByTestId("character-card");
    expect(cardElement).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(cardElement);

    expect(await screen.findByTestId("detailed-character")).toBeInTheDocument();
  });

  it("should trigger additional api on card details open", async () => {
    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByTestId("character-card"));

    expect(mockGetCharacterById).toHaveBeenCalledTimes(1);
  });
});
