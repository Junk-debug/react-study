import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AxiosResponse, AxiosHeaders } from "axios";
import DetailedCharacter from "../../pages/characterPage/detailedCharacter";
import mockCharacters from "../mocks/mockCharacters";
import CardsGroup from "../../pages/homePage/cardsGroup";
import api from "../../api/api";
import { Character } from "../../api/types";

vi.mock("../../api/api", () => ({
  default: {
    getCharacters: vi.fn(),
    getCharacterById: vi.fn(),
  },
}));

describe("CharacterCard", () => {
  const renderFn = () => {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CardsGroup characters={[mockCharacters[0]]} error={null} />
                <Outlet />
              </>
            }
          >
            <Route path="character/:id" element={<DetailedCharacter />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    const apiMock = vi.mocked(api);

    apiMock.getCharacterById.mockResolvedValue({
      data: mockCharacters[0],
    } as AxiosResponse<Character, AxiosHeaders>);

    renderFn();

    const cardElement = screen.getByText(mockCharacters[0].name);
    expect(cardElement).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(cardElement);

    const closeButton = screen.getByLabelText(/close/i);

    expect(closeButton).toBeInTheDocument();
  });

  it("should trigger additional api on card details open", async () => {
    const apiMock = vi.mocked(api);

    apiMock.getCharacterById.mockResolvedValue({
      data: mockCharacters[0],
    } as AxiosResponse<Character, AxiosHeaders>);

    renderFn();

    const user = userEvent.setup();

    await user.click(screen.getByText(mockCharacters[0].name));

    expect(apiMock.getCharacterById).toHaveBeenCalledTimes(1);
  });
});
