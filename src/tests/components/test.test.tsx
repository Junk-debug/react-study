import { render, screen } from "@testing-library/react";
import { useState, useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import { AxiosHeaders, AxiosResponse } from "axios";
import api from "../../api/api";
import mockCharacters from "../mocks/mockCharacters";
import { Character, CharactersResponse } from "../../api/types";

const Test = () => {
  const [result, setResult] = useState<Character[] | null>(null);
  useEffect(() => {
    api.getCharacters().then((res) => setResult(res.data.results));
  }, []);
  return (
    <div>
      {result?.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  );
};

vi.mock("../../api/api", () => ({
  default: {
    getCharacters: vi.fn(),
    getCharacterById: vi.fn(),
  },
}));

describe("test", () => {
  it("should render mock api", async () => {
    const apiMock = vi.mocked(api);

    apiMock.getCharacters.mockResolvedValue({
      data: {
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
        results: mockCharacters,
      },
      status: 200,
      statusText: "",
      headers: {},
      config: {},
    } as AxiosResponse<CharactersResponse, AxiosHeaders>);

    render(<Test />);

    expect(await screen.findByText(/rick/i)).toBeInTheDocument();
  });
});
