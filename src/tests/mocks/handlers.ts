/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from "msw";
import { vi } from "vitest";
import mockCharacters from "./mockCharacters";
import mockEpisode from "./mockEpisode";

export const mockGetCharacterById = vi.fn();

export const baseUrl = "https://rickandmortyapi.com/api";

const handlers = [
  http.get(`${baseUrl}/character/1`, () => {
    mockGetCharacterById();
    return HttpResponse.json(mockCharacters[0]);
  }),

  http.get(`${baseUrl}/episode/1`, () => {
    return HttpResponse.json(mockEpisode);
  }),
];

export default handlers;
