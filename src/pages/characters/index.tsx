import { GetServerSideProps, NextPage } from "next";

import Button from "@/components/ui/button";
import ThemeToggler from "@/components/themeToggler";
import SearchBar from "@/components/searchBar";
import CardsGroup from "@/components/cardsGroup";
import PaginationBar from "@/components/paginationBar";
import DetailedCharacter from "@/components/detailedCharacter";
import Flyout from "@/components/flyout";

import useSearchLogic from "@/hooks/useSearchLogic";
import useTestError from "@/hooks/useTestError";

import { fetchCharacterDataWithEpisode, fetchCharacters } from "@/api/api";
import { ApiError, Character, CharactersResponse } from "@/api/types";

interface Props {
  page: number;
  charactersResponse: CharactersResponse | ApiError;
  detailedCharacter: {
    character: Character | ApiError;
    firstEpisodeName: string;
  } | null;
  search: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59",
  );

  const search = Array.isArray(context.query.search)
    ? undefined
    : context.query.search;

  const page = Number(context.query.page) || 1;

  const detailedId = Array.isArray(context.query.detailedId)
    ? undefined
    : context.query.detailedId;

  const charactersResponse = await fetchCharacters({
    page,
    name: search,
  });

  if (detailedId) {
    const detailedCharacter = await fetchCharacterDataWithEpisode(detailedId);

    return {
      props: {
        page,
        charactersResponse,
        detailedCharacter,
        search: search || "",
      },
    };
  }

  return {
    props: {
      page,
      charactersResponse,
      detailedCharacter: null,
      search: search || "",
    },
  };
};

const HomePage: NextPage<Props> = ({
  charactersResponse,
  page: currentPage,
  search,
  detailedCharacter,
}) => {
  const { throwTestError } = useTestError();

  const { info, results: characters = [] } =
    ("error" in charactersResponse ? undefined : charactersResponse) || {};

  const error = "error" in charactersResponse ? charactersResponse.error : null;

  const {
    inputValue,
    handleSearchInputValueChange,
    handleSearchButtonClick,
    handlePageButtonClick,
    handleErrorReset,
  } = useSearchLogic(search);

  return (
    <div className="flex">
      <div className="mx-auto w-full py-8 px-4 max-w-5xl flex flex-col gap-6">
        <div className="flex flex-row-reverse items-center justify-between">
          <Button variant="destructive" onClick={throwTestError}>
            Throw error
          </Button>

          <ThemeToggler />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Rick and Morty characters
        </h1>

        <SearchBar
          value={inputValue}
          onChange={handleSearchInputValueChange}
          onClick={handleSearchButtonClick}
        />

        {error && (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-medium">Oops..</h1>
            <p>{error}</p>
            <Button onClick={handleErrorReset}>Try again</Button>
          </div>
        )}

        <CardsGroup characters={characters} />

        <PaginationBar
          pagesCount={info?.pages || 0}
          currentPage={currentPage}
          onPageButtonClick={handlePageButtonClick}
        />

        <Flyout />
      </div>

      {detailedCharacter && (
        <DetailedCharacter detailedCharacter={detailedCharacter} />
      )}
    </div>
  );
};

export default HomePage;
