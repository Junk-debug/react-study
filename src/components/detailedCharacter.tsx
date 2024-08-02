import CloseButton from "@/components/ui/closeButton";
import clsx from "clsx";
import getStatusColor from "@/utils/getStatusColor";
import { useRouter } from "next/router";
import { ApiError, Character } from "@/api/types";
import Button from "./ui/button";
import ImgWithLoading from "./imgWithLoading";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    data-testid="detailed-character"
    className="flex w-96 items-start h-screen relative before:w-96"
  >
    <div
      className={clsx(
        "fixed w-96 flex h-screen p-4 flex-col rounded-md border shadow gap-2 overflow-auto transition-colors",
        "bg-white",
        "dark:bg-zinc-950 dark:border-zinc-800",
      )}
    >
      {children}
    </div>
  </div>
);

const DetailedCharacter: React.FC<{
  detailedCharacter: {
    character: Character | ApiError;
    firstEpisodeName: string;
  };
}> = ({ detailedCharacter: { character, firstEpisodeName } }) => {
  const router = useRouter();

  const handleCloseClick = () => {
    const { query } = router;
    const newQuery = { ...query };
    delete newQuery.detailedId;

    router.push({ query: newQuery }, undefined, {
      scroll: false,
    });
  };

  if ("error" in character) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-semibold mb-2">{character.error}</span>
          <Button aria-label="close" onClick={handleCloseClick}>
            Close
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">{character.name}</span>
        <CloseButton aria-label="close" onClick={handleCloseClick} />
      </div>
      <ImgWithLoading
        src={character.image}
        alt={character.name}
        className="w-full rounded-md"
      />

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
      <span>
        Location: <span className="font-medium">{character.location.name}</span>
      </span>
      {character.type && (
        <span>
          Type: <span className="font-medium">{character.type}</span>
        </span>
      )}
      <span>
        Gender: <span className="font-medium">{character.gender}</span>
      </span>
      <span>
        Total episodes:{" "}
        <span className="font-medium">{character.episode.length}</span>
      </span>
      {firstEpisodeName && (
        <span>
          First episode: <span className="font-medium">{firstEpisodeName}</span>
        </span>
      )}
      <span>
        Created:{" "}
        <span className="font-medium">
          {new Date(character.created).toUTCString()}
        </span>
      </span>
    </Layout>
  );
};

export default DetailedCharacter;
