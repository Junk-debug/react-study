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

  if (characters.length === 0) {
    return <div>There is nothing here</div>;
  }

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {characters.map((item) => (
        <CharacterCard key={item.id} character={item} />
      ))}
    </div>
  );
};

export default CardsGroup;
