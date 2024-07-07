import { Component } from "react";
import { AxiosError } from "axios";
import api, { ApiError, CharactersResponse } from "../api/api";
import Input from "../components/ui/input";
import ErrorBoundary, { FallbackProps } from "../components/errorBoundary";
import CardsGroup from "./cardsGroup";
import Button from "../components/ui/button";
import PaginationBar from "./paginationBar";
import Loader from "../components/ui/loader";

interface Props {}

interface State {
  search: string;
  page: number;
  apiResponse: CharactersResponse | null;
  error: AxiosError<ApiError> | null;
  isLoading: boolean;
  testError: boolean;
}

function ErrorFallback({ error, reset }: FallbackProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-medium">Oops..</h1>
      <p>{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

// TODO: refactor this component to separate logic and displaying
class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      apiResponse: null,
      error: null,
      isLoading: false,
      testError: false,
    };
  }

  componentDidMount() {
    const { search, page } = this.state;
    const searchFromLS = localStorage.getItem("search");

    if (searchFromLS !== null) {
      this.setState({ search: searchFromLS });
      this.handleRequest(searchFromLS, page);
    } else {
      this.handleRequest(search, page);
    }
  }

  handleRequest = (search: string, page: number) => {
    this.setState({ isLoading: true });

    api
      .getCharacters({ name: search, page })
      .then((res) => {
        this.setState({ apiResponse: res.data });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  handleSearchButtonClick = () => {
    const { search } = this.state;

    localStorage.setItem("search", search);
    this.setState({ page: 1 });
    this.handleRequest(search, 1);
  };

  handlePageButtonClick = (pageNumber: number) => {
    const { search } = this.state;

    this.setState({ page: pageNumber });
    this.handleRequest(search, pageNumber);
  };

  render() {
    const { search, page, apiResponse, error, isLoading, testError } =
      this.state;
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
            // TODO: add local storage logic
            placeholder="Type something"
            value={search}
            disabled={isLoading}
            onChange={this.handleSearchChange}
          />
          <Button disabled={isLoading} onClick={this.handleSearchButtonClick}>
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center">
            <Loader className="w-11 h-11" />
          </div>
        ) : (
          <ErrorBoundary
            onReset={() => {
              this.setState({ search: "", error: null });
              this.handleRequest("", 1);
            }}
            fallback={ErrorFallback}
          >
            <CardsGroup error={error} characters={characters} />
            <PaginationBar
              pagesCount={info?.pages || 0}
              currentPage={page}
              handlePageButtonClick={this.handlePageButtonClick}
            />
          </ErrorBoundary>
        )}

        <Button
          className="!bg-red-600 hover:!bg-red-600/90 self-center md:self-end"
          onClick={() => {
            this.setState({ testError: true });
          }}
        >
          Throw error
        </Button>
      </div>
    );
  }
}

export default Search;
