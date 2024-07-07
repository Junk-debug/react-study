import { PureComponent } from "react";
import { Character } from "../../api/api";
import ImgWithLoading from "../../components/imgWithLoading";

interface Props {
  character: Character;
}

function getStatusColor(status: Character["status"]) {
  switch (status) {
    case "Alive":
      return "text-green-500";
    case "Dead":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
}

class CharacterCard extends PureComponent<Props> {
  render() {
    const { character } = this.props;
    return (
      <div className="flex flex-col gap-2 min-w-72 max-w-80 rounded-2xl border bg-white shadow p-4 transition-all hover:-translate-y-1 hover:shadow-md">
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
  }
}

export default CharacterCard;
