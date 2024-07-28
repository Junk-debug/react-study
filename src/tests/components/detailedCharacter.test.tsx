import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  it,
  expect,
  describe,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { delay } from "msw";
import DetailedCharacter from "../../pages/detailedCharacter/detailedCharacter";
import CardsGroup from "../../pages/homePage/cardsGroup";
import mockCharacters from "../mocks/mockCharacters";

import store from "../../app/store";
import server from "../mocks/server";
import apiSlice from "../../api/api";

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

describe("DetailedCharacter", () => {
  it("should display loading indicator while fetching data", async () => {
    renderFn();

    await delay(2000);

    const user = userEvent.setup();
    await user.click(screen.getByTestId("character-card"));

    const loader = screen.getByLabelText("loading-indicator");

    expect(loader).toBeInTheDocument();

    waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });

  it("should correctly display the detailed card data", async () => {
    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByTestId("character-card"));

    waitFor(() => {
      expect(screen.getByText(mockCharacters[0].gender)).toHaveTextContent(
        mockCharacters[0].gender,
      );

      expect(
        screen.getByText(mockCharacters[0].location.name),
      ).toHaveTextContent(mockCharacters[0].location.name);

      expect(
        screen.getByText(mockCharacters[0].episode.length.toString()),
      ).toHaveTextContent(mockCharacters[0].episode.length.toString());
    });
  });

  it("should hide component on click the close button", async () => {
    renderFn();

    const characterCard = screen.getByTestId("character-card");

    const user = userEvent.setup();
    await user.click(characterCard);

    const closeButton = await screen.findByRole("button");
    await user.click(closeButton);

    waitFor(() => {
      expect(
        screen.queryByTestId("detailed-character"),
      ).not.toBeInTheDocument();
    });
  });
});
