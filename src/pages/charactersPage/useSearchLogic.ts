import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api, { CharactersResponse, ApiError } from "../../api/api";

export default function useSearchLogic() {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [apiResponse, setApiResponse] = useState<CharactersResponse | null>(
    null,
  );
  const [error, setError] = useState<AxiosError<ApiError> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testError, setTestError] = useState<boolean>(false);

  const handleRequest = (name: string, page: number) => {
    setIsLoading(true);

    api
      .getCharacters({ name: name.trim(), page })
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    localStorage.setItem("search", searchInputValue);
    setCurrentPage(1);
    handleRequest(searchInputValue, 1);
  };

  const handlePageButtonClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handleRequest(searchInputValue, pageNumber);
  };

  const handleErrorReset = () => {
    localStorage.setItem("search", "");
    setSearchInputValue("");
    setError(null);
    handleRequest("", 1);
  };

  useEffect(() => {
    const searchFromLS = localStorage.getItem("search");

    if (searchFromLS !== null) {
      setSearchInputValue(searchFromLS);
      handleRequest(searchFromLS, currentPage);
    } else {
      handleRequest(searchInputValue, currentPage);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    searchInputValue,
    currentPage,
    apiResponse,
    error,
    isLoading,
    testError,
    handleSearchInputChange,
    handleSearchButtonClick,
    handlePageButtonClick,
    handleErrorReset,
    handleErrorButtonClick: () => setTestError(true),
  };
}
