import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CharacterCard from "./charactersPage/characterCard";
import api, { Character } from "../api/api";
import Loader from "../components/ui/loader";
import useApiRequest from "../hooks/useApiRequest";

interface Props {}

const CharacterPage: React.FC<Props> = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);

  const { executeRequest, loading, error } = useApiRequest(
    api.getCharacterById,
  );

  useEffect(() => {
    executeRequest(Number(id)).then((res) => {
      setCharacter(res.data);
    });
  }, [executeRequest, id]);

  if (loading) {
    return <Loader className="w-11 h-11" />;
  }

  if (error) {
    return <div>{error.response?.data.error}</div>;
  }

  return character && <CharacterCard character={character} />;
};

export default CharacterPage;
