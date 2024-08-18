"use client";

import { useSearchParams } from "next/navigation";
import { Character } from "@/api/types";
import { memo } from "react";
import Link from "next/link";
import CharacterCard from "./characterCard";

interface Props {
  characters: Character[];
}

const CardsGroup: React.FC<Props> = ({ characters }) => {
  const searchParams = useSearchParams();

  if (!characters.length) {
    return <p className="hidden">Nothing found</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_320px)] justify-center gap-4">
      {characters.map((character) => (
        <Link
          href={`/characters/${character.id}?${searchParams.toString()}`}
          key={character.id}
          scroll={false}
        >
          <CharacterCard className="h-full" character={character} />
        </Link>
      ))}
    </div>
  );
};

export default memo(CardsGroup);
