import { useParams } from "react-router-dom";
import useNavigateWithSearchParams from "../../hooks/useNavigateWithSearchParams";
import apiSlice from "../../api/api";

export default function useCharacterPage() {
  const { id } = useParams();
  const navigate = useNavigateWithSearchParams();

  const {
    data: character,
    isLoading: isCharacterLoading,
    error: characterError,
  } = apiSlice.useGetCharacterByIdQuery(Number(id));

  const episodeUrl = character?.episode[0];

  const parts = episodeUrl?.split("/");

  const episodeId = parts?.[parts.length - 1];

  const {
    data: episode,
    isLoading: isEpisodeLoading,
    error: episodeError,
  } = apiSlice.useGetEpisodeByIdQuery(Number(episodeId), {
    skip: !episodeId,
  });

  return {
    character,
    episode,
    loading: isCharacterLoading || isEpisodeLoading,
    error: characterError || episodeError,
    navigate,
  };
}
