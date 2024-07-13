import { AxiosError } from "axios";
import { ApiError, Character } from "../../api/api";
import CharacterCard from "./characterCard";
import useNavigateWithSearchParams from "../../hooks/useNavigateWithSearchParams";

interface Props {
  characters: Character[];
  error: AxiosError<ApiError> | null;
  className?: string;
}

const CardsGroup: React.FC<Props> = ({ characters, error, className }) => {
  const navigate = useNavigateWithSearchParams();

  if (error) {
    throw new Error(error.response?.data?.error);
  }

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {characters.map((item) => (
        <CharacterCard
          onClick={() => navigate(`/character/${item.id}`)}
          key={item.id}
          character={item}
        />
      ))}
    </div>
  );
};

export default CardsGroup;
