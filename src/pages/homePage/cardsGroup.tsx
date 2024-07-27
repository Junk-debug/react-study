import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";
import CharacterCard from "./characterCard";
import { ApiError, Character } from "../../api/types";
import useNavigateWithSearchParams from "../../hooks/useNavigateWithSearchParams";

interface Props {
  characters: Character[];
  error?: FetchBaseQueryError | SerializedError;
  className?: string;
}

const CardsGroup: React.FC<Props> = ({ characters, error, className }) => {
  const navigate = useNavigateWithSearchParams();
  if (error) {
    if ("data" in error) {
      const data = error.data as ApiError;

      throw new Error(data.error);
    } else if ("error" in error) {
      throw new Error(error.error);
    }

    throw new Error("Something went wrong");
  }

  if (characters.length === 0) {
    return <div>There is nothing here</div>;
  }

  return (
    <div className={`flex flex-wrap gap-4 ${className || ""}`}>
      {characters.map((item) => (
        <CharacterCard
          onClick={() => {
            navigate(`/character/${item.id}`);
          }}
          key={item.id}
          character={item}
        />
      ))}
    </div>
  );
};

export default CardsGroup;
