import { Outlet } from "react-router-dom";
import ErrorBoundary, { FallbackProps } from "../../components/errorBoundary";
import CardsGroup from "./cardsGroup";
import Button from "../../components/ui/button";
import PaginationBar from "./paginationBar";
import useSearchLogic from "./useSearchLogic";
import useTestError from "../../hooks/useTestError";
import Skeleton from "../../components/ui/skeleton";
import SearchBar from "./searchBar";

const ErrorFallback: React.FC<FallbackProps> = ({ error, reset }) => (
  <div className="flex flex-col items-center gap-2">
    <h1 className="text-2xl font-medium">Oops..</h1>
    <p>{error.message}</p>
    <Button onClick={reset}>Try again</Button>
  </div>
);

interface Props {}

const HomePage: React.FC<Props> = () => {
  const {
    searchInputValue,
    currentPage,
    apiResponse,
    error,
    loading,
    handleSearchInputChange,
    handlePageButtonClick,
    handleSearchButtonClick,
    handleErrorReset,
  } = useSearchLogic();

  const { throwTestError } = useTestError();

  const { info, results: characters = [] } = apiResponse || {};

  return (
    <div className="flex">
      <div className="mx-auto py-8 px-4 max-w-5xl flex flex-col gap-6">
        <Button
          className="!bg-red-600 hover:!bg-red-600/90 self-center md:self-end"
          onClick={throwTestError}
        >
          Throw error
        </Button>

        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Rick and Morty characters
        </h1>

        <SearchBar
          value={searchInputValue}
          onChange={handleSearchInputChange}
          onClick={handleSearchButtonClick}
        />

        {loading ? (
          <div className="flex flex-wrap gap-4">
            <Skeleton className="w-[300px] h-[400px] rounded-2xl" />
            <Skeleton className="w-[300px] h-[400px] rounded-2xl" />
            <Skeleton className="w-[300px] h-[400px] rounded-2xl" />
          </div>
        ) : (
          <ErrorBoundary onReset={handleErrorReset} fallback={ErrorFallback}>
            <CardsGroup error={error} characters={characters} />
            <PaginationBar
              pagesCount={info?.pages || 0}
              currentPage={currentPage}
              onPageButtonClick={handlePageButtonClick}
            />
          </ErrorBoundary>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default HomePage;
