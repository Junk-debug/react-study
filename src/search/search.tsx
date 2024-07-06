import { Component } from "react";
import { AxiosError } from "axios";
import api, { Character, CharactersResponse } from "../api/api";
import Input from "../components/ui/input";
import ErrorBoundary from "../components/errorBoundary";
import CardsGroup from "./cardsGroup";
import Button from "../components/ui/button";

interface Props {}

interface State {
  search: string;
  page: number;
  characters: Character[];
  error: AxiosError | null;
  isLoading: boolean;
  info: CharactersResponse["info"] | null;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      characters: [],
      info: null,
      error: null,
      isLoading: false,
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
        this.setState({ characters: res.data.results, info: res.data.info });
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
    const { search, page, characters, info, error, isLoading } = this.state;
    return (
      <div className="w-full h-24 px-20 py-5">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Type something"
            value={search}
            onChange={this.handleSearchChange}
          />
          <Button onClick={this.handleSearchButtonClick}>Search</Button>
        </div>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ErrorBoundary>
              <CardsGroup error={error} characters={characters} />
            </ErrorBoundary>
          )}
        </div>
        <div>
          <p>Page: {page}</p>
          <div className="flex gap-1 flex-wrap">
            {[...Array(info?.pages).keys()]
              .map((i) => i + 1)
              .map((pageNumber) => (
                <Button
                  variant={pageNumber === page ? "standard" : "outlined"}
                  onClick={() => this.handlePageButtonClick(pageNumber)}
                  key={pageNumber}
                >
                  {pageNumber}
                </Button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
