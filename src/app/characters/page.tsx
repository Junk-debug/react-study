import { fetchCharacters } from "@/api/api";
import Button from "@/components/ui/button";
import Link from "next/link";
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
      {error && (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-medium">Oops..</h1>
          <p>{error}</p>

          <Link href="/">
            <Button>Try again</Button>
          </Link>
        </div>
      )}
      <CardsGroup characters={characters} />
      <PaginationBar pagesCount={info?.pages || 0} />
    </>
  );
}
