import {
  ApiError,
  Character,
  CharactersParams,
  CharactersResponse,
  Episode,
} from "./types";

export const baseUrl = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (params: CharactersParams) => {
  const { page, name, status, species, type, gender } = params;
  const res = await fetch(
    `${baseUrl}/character/?page=${page || ""}&name=${name || ""}&status=${status || ""}&species=${species || ""}&type=${type || ""}&gender=${gender || ""}`,
    {
      next: { revalidate: 3600 },
    },
  );
  return res.json() as Promise<CharactersResponse | ApiError>;
};

export const fetchCharacterById = async (id: string) => {
  const res = await fetch(`${baseUrl}/character/${id}`, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    },
  });
  return res.json() as Promise<Character | ApiError>;
};

export const fetchEpisodeById = async (id: string) => {
  const res = await fetch(`${baseUrl}/episode/${id}`, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    },
  });
  return res.json() as Promise<Episode>;
};

export const fetchCharacterDataWithEpisode = async (characterId: string) => {
  const character = await fetchCharacterById(characterId);

  if ("error" in character) return { character, firstEpisodeName: "" };

  const firstEpisodeUrl = character.episode[0];

  if (!firstEpisodeUrl) return { character, firstEpisodeName: "" };

  const parts = firstEpisodeUrl?.split("/");
  const firstEpisodeId = parts?.[parts.length - 1];
  const episode = await fetchEpisodeById(firstEpisodeId);

  return { character, firstEpisodeName: episode.name };
};
