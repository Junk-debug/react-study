import clsx from "clsx";
import Loader from "../../components/ui/loader";
import ImgWithLoading from "../../components/imgWithLoading";
import getStatusColor from "../homePage/utils/getStatusColor";
import CloseButton from "../../components/ui/closeButton";
import useCharacterPage from "./useCharacterPage";

interface Props {}

const DetailedCharacter: React.FC<Props> = () => {
  const { character, episode, loading, error, navigate } = useCharacterPage();

  if (loading) {
    return (
      <div className="flex w-96 h-screen relative before:w-96">
        <div className="w-96 h-screen flex items-center fixed justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error.response?.data.error}</div>;
  }

  return (
    <div
      data-testid="detailed-character"
      className="flex w-96 items-start h-screen relative before:w-96"
    >
      {character && (
        <div
          className={clsx(
            "fixed w-96 flex h-screen p-4 flex-col rounded-md border shadow gap-2 overflow-auto transition-colors",
            "bg-white",
            "dark:bg-zinc-950 dark:border-zinc-800",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">{character.name}</span>
            <CloseButton aria-label="close" onClick={() => navigate("/")} />
          </div>
          <ImgWithLoading src={character.image} alt={character.name} />

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
            Location:{" "}
            <span className="font-medium">{character.location.name}</span>
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
          {episode && (
            <span>
              First episode: <span className="font-medium">{episode.name}</span>
            </span>
          )}
          <span>
            Created:{" "}
            <span className="font-medium">
              {new Date(character.created).toUTCString()}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default DetailedCharacter;
