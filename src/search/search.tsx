import { Component } from "react";
import { AxiosError } from "axios";
import api, { ApiError, CharactersResponse } from "../api/api";
import Input from "../components/ui/input";
import ErrorBoundary from "../components/errorBoundary";
import CardsGroup from "./cardsGroup";
import Button from "../components/ui/button";
import PaginationBar from "./paginationBar";

interface Props {}

interface State {
  search: string;
  page: number;
  apiResponse: CharactersResponse | null;
  error: AxiosError<ApiError> | null;
  isLoading: boolean;
  testError: boolean;
}

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
    this.handleRequest(search, page);
  }

  handleRequest = (search: string, page: number) => {
    this.setState({ isLoading: true });

    api
      .getCharacters({ name: search, page })
      .then((res) => {
        this.setState({ apiResponse: res.data });
        // eslint-disable-next-line no-console
        console.log(res);
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  handleSearchButtonClick = () => {
    const { search } = this.state;

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
      throw new Error("test error");
    }

    return (
      <div className="w-full h-24 px-20 py-5">
        <Button
          onClick={() => {
            this.setState({ testError: true });
          }}
        >
          Throw error
        </Button>

        <div className="flex gap-2 items-center">
          <Input
            placeholder="Type something"
            value={search}
            onChange={this.handleSearchChange}
          />
          <Button onClick={this.handleSearchButtonClick}>Search</Button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ErrorBoundary
            onReset={() => {
              this.setState({ search: "", error: null });
              this.handleRequest("", 1);
            }}
          >
            <CardsGroup error={error} characters={characters} />
            <PaginationBar
              pagesCount={info?.pages || 0}
              currentPage={page}
              handlePageButtonClick={this.handlePageButtonClick}
            />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}

export default Search;
