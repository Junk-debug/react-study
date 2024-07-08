import { AxiosError } from "axios";
import { ApiError, Character } from "../../api/api";
import CharacterCard from "./characterCard";

interface Props {
  characters: Character[];
  error: AxiosError<ApiError> | null;
  className?: string;
}

const CardsGroup: React.FC<Props> = ({ characters, error, className }) => {
  if (error) {
    throw new Error(error.response?.data?.error);
  }

  return (
    <div
      className={`grid grid-cols-1 gap-8 sm:grid-cols-2 md+:grid-cols-3 justify-start ${className}`}
    >
      {characters.map((item) => (
        <CharacterCard key={item.id} character={item} />
      ))}
    </div>
  );
};

export default CardsGroup;
