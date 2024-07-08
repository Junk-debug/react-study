import Input from "../../components/ui/input";
import ErrorBoundary, { FallbackProps } from "../../components/errorBoundary";
import CardsGroup from "./cardsGroup";
import Button from "../../components/ui/button";
import PaginationBar from "./paginationBar";
import Loader from "../../components/ui/loader";
import useSearchLogic from "./useSearchLogic";

const ErrorFallback: React.FC<FallbackProps> = ({ error, reset }) => (
  <div className="flex flex-col items-center gap-2">
    <h1 className="text-2xl font-medium">Oops..</h1>
    <p>{error.message}</p>
    <Button onClick={reset}>Try again</Button>
  </div>
);

interface Props {}

const CharactersPage: React.FC<Props> = () => {
  const {
    searchInputValue,
    currentPage,
    apiResponse,
    error,
    isLoading,
    testError,
    handleSearchInputChange,
    handlePageButtonClick,
    handleSearchButtonClick,
    handleErrorReset,
    handleErrorButtonClick,
  } = useSearchLogic();

  const { info, results: characters = [] } = apiResponse || {};

  if (testError) {
    throw new Error(
      "This is the test error to test error boundary functionality",
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        Rick and Morty characters
      </h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Input
          placeholder="Type something"
          value={searchInputValue}
          disabled={isLoading}
          onChange={handleSearchInputChange}
        />
        <Button disabled={isLoading} onClick={handleSearchButtonClick}>
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center">
          <Loader className="w-11 h-11" />
        </div>
      ) : (
        <ErrorBoundary onReset={handleErrorReset} fallback={ErrorFallback}>
          <CardsGroup error={error} characters={characters} />
          <PaginationBar
            pagesCount={info?.pages || 0}
            currentPage={currentPage}
            handlePageButtonClick={handlePageButtonClick}
          />
        </ErrorBoundary>
      )}

      <Button
        className="!bg-red-600 hover:!bg-red-600/90 self-center md:self-end"
        onClick={handleErrorButtonClick}
      >
        Throw error
      </Button>
    </div>
  );
};

export default CharactersPage;
