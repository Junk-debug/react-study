import axiosCLient from "axios";

const axios = axiosCLient.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const enum Status {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}

export const enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  GENDERLESS = "Genderless",
  UNKNOWN = "unknown",
}

interface Location {
  name: string;
  url: string;
}

interface Origin extends Location {}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: Info;
  results: Character[];
}

interface CharactersParams {
  page?: number;
  name?: Character["name"];
  status?: Character["status"];
  species?: Character["species"];
  type?: Character["type"];
  gender?: Character["gender"];
}

export interface ApiError {
  error: string;
}

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
