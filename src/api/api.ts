import axiosCLient from "axios";
import { Character, CharactersParams, CharactersResponse } from "./types";

const axios = axiosCLient.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const api = {
  getCharacters: (params?: CharactersParams) => {
    const { page, name, status, species, type, gender } = params || {};
    return axios.get<CharactersResponse>(
      `character/?page=${page || ""}&name=${name || ""}&status=${status || ""}&species=${species || ""}&type=${type || ""}&gender=${gender || ""}`,
    );
  },

  getCharacterById: (id: Character["id"]) => {
    return axios.get<Character>(`character/${id}`);
  },
};

export default api;
