import { fetchCharacters } from "@/api/api";
import SearchBar from "./searchBar";
import CardsGroup from "./cardsGroup";
import PaginationBar from "./paginationBar";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: { page: string; search: string };
}) {
  const { page, search } = searchParams;

  const response = await fetchCharacters({ page: Number(page), name: search });

  const { info, results: characters = [] } =
    ("error" in response ? undefined : response) || {};

  const error = "error" in response ? response.error : null;

  return (
    <>
      <SearchBar />
      {error && <div>{error}</div>}
      <CardsGroup characters={characters} />
      <PaginationBar pagesCount={info?.pages || 0} />
    </>
  );
}
