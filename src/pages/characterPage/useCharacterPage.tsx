import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { Character, Episode } from "../../api/api";
import useApiRequest from "../../hooks/useApiRequest";
import useNavigateWithSearchParams from "../../hooks/useNavigateWithSearchParams";

export default function useCharacterPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const navigate = useNavigateWithSearchParams();

  const { executeRequest, loading, error } = useApiRequest(
    api.getCharacterById,
  );

  useEffect(() => {
    executeRequest(Number(id)).then((res) => {
      setCharacter(res.data);

      fetch(res.data.episode[0]).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setEpisode(data);
          });
        }
      });
    });
  }, [executeRequest, id]);

  return { character, episode, loading, error, navigate };
}
