import { useRouter } from "next/router";
import { Character } from "@/api/types";
import { memo } from "react";
import CharacterCard from "./characterCard";

interface Props {
  characters: Character[];
}

const CardsGroup: React.FC<Props> = ({ characters }) => {
  const router = useRouter();

  if (!characters.length) {
    return <p className="hidden">Nothing found</p>;
  }

  const openDetailedCard = (detailedId: number) => {
    const { query } = router;
    router.push({ query: { ...query, detailedId } }, undefined, {
      scroll: false,
    });
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_320px)] justify-center gap-4">
      {characters.map((character) => (
        <CharacterCard
          onClick={() => openDetailedCard(character.id)}
          character={character}
          key={character.id}
        />
      ))}
    </div>
  );
};

export default memo(CardsGroup);
