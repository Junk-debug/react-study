import { fetchCharacterDataWithEpisode } from "@/api/api";
import ImgWithLoading from "@/components/imgWithLoading";
import getStatusColor from "@/utils/getStatusColor";
import CloseButton from "./closeButton";

export default async function DetailedCharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { character, firstEpisodeName } = await fetchCharacterDataWithEpisode(
    params.id,
  );

  if ("error" in character) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-3xl font-semibold mb-2">{character.error}</span>
        <CloseButton />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">{character.name}</span>
        <CloseButton variant="icon" />
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
    </>
  );
}
