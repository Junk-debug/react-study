/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Character } from "../../api/api";
import ImgWithLoading from "../../components/imgWithLoading";
import useNavigateWithSearchParams from "../../hooks/useNavigateWithSearchParams";
import getStatusColor from "./utils/getStatusColor";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({ character, className, ...props }) => {
  const navigate = useNavigateWithSearchParams();
  return (
    <div
      onClick={() => navigate(`/character/${character.id}`)}
      className={`flex flex-col gap-2 min-w-72 max-w-80 rounded-2xl border bg-white shadow p-4 transition-all hover:-translate-y-1 hover:shadow-md ${className}`}
      {...props}
    >
      <ImgWithLoading
        src={character.image}
        alt={character.name}
        className="rounded-md"
      />

      <span className="text-xl font-semibold">{character.name}</span>
      <span>
        Status:{" "}
        <span className={`${getStatusColor(character.status)} font-medium`}>
          {character.status}
        </span>
      </span>
      <span>
        Species: <span className="font-medium">{character.species}</span>
      </span>
      <span>
        Origin: <span className="font-medium">{character.origin.name}</span>
      </span>
    </div>
  );
};

export default CharacterCard;
