import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { it, expect, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { AxiosResponse, AxiosHeaders } from "axios";
import DetailedCharacter from "../../pages/detailedCharacter/detailedCharacter";
import CardsGroup from "../../pages/homePage/cardsGroup";
import mockCharacters from "../mocks/mockCharacters";
import api from "../../api/api";
import { Character } from "../../api/types";

vi.mock("../../api/api", () => ({
  default: {
    getCharacters: vi.fn(),
    getCharacterById: vi.fn(),
  },
}));

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

describe("DetailedCharacter", () => {
  it("should display loading indicator while fetching data", async () => {
    const apiMock = vi.mocked(api);

    apiMock.getCharacterById.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: mockCharacters[0],
            } as AxiosResponse<Character, AxiosHeaders>);
          }, 500);
        }),
    );

    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByText(mockCharacters[0].name));

    const loader = screen.getByLabelText("loading-indicator");

    expect(loader).toBeInTheDocument();

    waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });

  it("should correctly display the detailed card data", async () => {
    const apiMock = vi.mocked(api);

    apiMock.getCharacterById.mockResolvedValue({
      data: mockCharacters[0],
    } as AxiosResponse<Character, AxiosHeaders>);

    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByText(mockCharacters[0].name));

    expect(screen.getByText(mockCharacters[0].gender)).toHaveTextContent(
      mockCharacters[0].gender,
    );

    expect(screen.getByText(mockCharacters[0].location.name)).toHaveTextContent(
      mockCharacters[0].location.name,
    );

    expect(
      screen.getByText(mockCharacters[0].episode.length.toString()),
    ).toHaveTextContent(mockCharacters[0].episode.length.toString());
  });

  it("should hide component on click the close button", async () => {
    const apiMock = vi.mocked(api);

    apiMock.getCharacterById.mockResolvedValue({
      data: mockCharacters[0],
    } as AxiosResponse<Character, AxiosHeaders>);

    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByText(mockCharacters[0].name));

    const closeButton = screen.getByRole("button");
    await user.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });
});
