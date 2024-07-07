import { Component, ComponentType } from "react";
import { AxiosError } from "axios";
import api, { ApiError, CharactersResponse } from "../api/api";
import { SearchPageProps } from "./searchPage";

interface Props {
  searchPage: ComponentType<SearchPageProps>;
}

interface State {
  search: string;
  page: number;
  apiResponse: CharactersResponse | null;
  error: AxiosError<ApiError> | null;
  isLoading: boolean;
  testError: boolean;
}

class WithSearchLogic extends Component<Props, State> {
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

  handleErrorReset = () => {
    localStorage.setItem("search", "");
    this.setState({ search: "", error: null });
    this.handleRequest("", 1);
  };

  render() {
    const { searchPage: SearchPage } = this.props;
    const { search, page, apiResponse, error, isLoading, testError } =
      this.state;

    return (
      <SearchPage
        search={search}
        handleSearchChange={this.handleSearchChange}
        handleSearchButtonClick={this.handleSearchButtonClick}
        page={page}
        handlePageButtonClick={this.handlePageButtonClick}
        apiResponse={apiResponse}
        error={error}
        isLoading={isLoading}
        testError={testError}
        handleErrorButtonClick={() => this.setState({ testError: true })}
        handleErrorReset={this.handleErrorReset}
      />
    );
  }
}

export default WithSearchLogic;
