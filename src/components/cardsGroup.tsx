import { useRouter } from "next/router";
import { Character } from "@/api/types";
import CharacterCard from "./characterCard";
import useRouteLoading from "@/hooks/useRouteLoading";
import Loader from "./ui/loader";
import { memo } from "react";

interface Props {
  characters: Character[];
}

const CardsGroup: React.FC<Props> = ({ characters }) => {
  const router = useRouter();
  const routeLoading = useRouteLoading();

  const loading = !router.query.detailedId && routeLoading;

  if (loading) {
    return (
      <div className="h-max w-full flex justify-center items-center">
        <Loader />
      </div>
    );
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
