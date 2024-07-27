import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../redux/redux";
import {
  selectSelectedCharactersAmount,
  unselectAllCharacters,
} from "../../redux/slices/selectedCharactersSlice";
import Button from "../../components/ui/button";

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedItemsAmount = useAppSelector(selectSelectedCharactersAmount);

  const handleUnselectAll = () => {
    if (selectedItemsAmount > 0) {
      dispatch(unselectAllCharacters());
    }
  };

  if (selectedItemsAmount <= 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        "z-40 fixed bottom-10 right-10",
        "rounded-md border shadow",
        "gap-2 p-4 transition-all hover:shadow-md",
        "bg-white",
        "dark:bg-zinc-950 dark:border-zinc-700",
        "flex flex-col",
      )}
    >
      <span>Selected items: {selectedItemsAmount}</span>
      <Button onClick={handleUnselectAll}>Unselect all</Button>
      <Button disabled>Download</Button>
    </div>
  );
};

export default Flyout;
