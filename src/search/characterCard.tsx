import { PureComponent } from "react";
import { Character } from "../api/api";

interface Props {
  character: Character;
}

class CharacterCard extends PureComponent<Props> {
  render() {
    const { character } = this.props;
    return (
      <div>
        <img src={character.image} alt={character.name} />
        {character.name}
      </div>
    );
  }
}

export default CharacterCard;
