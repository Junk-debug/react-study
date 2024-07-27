import clsx from "clsx";
import { memo } from "react";
import { Character } from "../../api/types";
import ImgWithLoading from "../../components/imgWithLoading";
import getStatusColor from "./utils/getStatusColor";
import Checkbox from "../../components/ui/checkbox";
import {
  selectCharacter,
  selectIsSelected,
  unselectCharacter,
} from "../../redux/slices/selectedCharactersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/redux";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({ character, className, ...props }) => {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector((state) =>
    selectIsSelected(state, character.id),
  );

  const handleCheckboxClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (!isSelected) {
      dispatch(selectCharacter(character));
    } else {
      dispatch(unselectCharacter(character.id));
    }
  };

  return (
    <div
      data-testid="character-card"
      className={clsx(
        className,
        "relative",
        "rounded-2xl border shadow",
        "flex flex-col gap-2 p-4 min-w-72 max-w-80 transition-all hover:-translate-y-1 hover:shadow-md",
        "bg-white",
        "dark:bg-zinc-950 dark:border-zinc-800",
      )}
      {...props}
    >
      <Checkbox
        checked={isSelected}
        onClick={handleCheckboxClick}
        className={clsx(
          "absolute right-6 top-6 z-10",
          "bg-white dark:bg-zinc-950",
        )}
      />

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

export default memo(CharacterCard);
