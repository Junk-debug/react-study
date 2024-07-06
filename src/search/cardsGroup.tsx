import { PureComponent } from "react";
import { AxiosError } from "axios";
import { Character } from "../api/api";

interface Props {
  characters: Character[];
  error: AxiosError | null;
}

class CardsGroup extends PureComponent<Props> {
  render() {
    const { characters, error } = this.props;
    if (error) {
      // FIXME: fix this type error
      // throw new Error(error.response?.data?.error);
    }

    return (
      <div>
        {characters.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    );
  }
}

export default CardsGroup;
