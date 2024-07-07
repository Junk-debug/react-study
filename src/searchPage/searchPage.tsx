import { AxiosError } from "axios";
import Input from "../components/ui/input";
import ErrorBoundary, { FallbackProps } from "../components/errorBoundary";
import CardsGroup from "./cardsGroup";
import Button from "../components/ui/button";
import PaginationBar from "./paginationBar";
import Loader from "../components/ui/loader";
import { CharactersResponse, ApiError } from "../api/api";

function ErrorFallback({ error, reset }: FallbackProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-medium">Oops..</h1>
      <p>{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

export interface SearchPageProps {
  search: string;
  page: number;
  apiResponse: CharactersResponse | null;
  error: AxiosError<ApiError> | null;
  isLoading: boolean;
  testError: boolean;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageButtonClick: (pageNumber: number) => void;
  handleSearchButtonClick: () => void;
  handleErrorReset: () => void;
  handleErrorButtonClick: () => void;
}

function SearchPage(props: SearchPageProps) {
  const {
    search,
    page,
    apiResponse,
    error,
    isLoading,
    testError,
    handleSearchChange,
    handlePageButtonClick,
    handleSearchButtonClick,
    handleErrorReset,
    handleErrorButtonClick,
  } = props;
  const { info, results: characters = [] } = apiResponse || {};

  if (testError) {
    throw new Error(
      "This is the test error to test error boundary functionality",
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Type something"
          value={search}
          disabled={isLoading}
          onChange={handleSearchChange}
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
            currentPage={page}
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
}

export default SearchPage;
