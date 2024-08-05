"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Character } from "@/api/types";
import { memo } from "react";
import CharacterCard from "./characterCard";

interface Props {
  characters: Character[];
}

const CardsGroup: React.FC<Props> = ({ characters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!characters.length) {
    return <p className="hidden">Nothing found</p>;
  }

  const openDetailedCard = (detailedId: number) => {
    router.push(`/characters/${detailedId}?${searchParams.toString()}`, {
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
