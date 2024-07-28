import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Character,
  CharactersParams,
  CharactersResponse,
  Episode,
} from "./types";

const baseUrl = "https://rickandmortyapi.com/api";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Characters"],
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, CharactersParams>({
      query: (params) => {
        const { page, name, status, species, type, gender } = params;
        return `/character/?page=${page || ""}&name=${name || ""}&status=${status || ""}&species=${species || ""}&type=${type || ""}&gender=${gender || ""}`;
      },
    }),

    getCharacterById: builder.query<Character, Character["id"]>({
      query: (id) => {
        return `/character/${id}`;
      },
    }),

    getEpisodeById: builder.query<Episode, Episode["id"]>({
      query: (id) => {
        return `/episode/${id}`;
      },
    }),
  }),
});

export default apiSlice;
