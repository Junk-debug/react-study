import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api, { CharactersResponse, ApiError } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function useSearchLogic() {
  const [searchInputValue, setSearchInputValue] = useLocalStorage("search", "");
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
    setCurrentPage(1);
    handleRequest(searchInputValue, 1);
  };

  const handlePageButtonClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handleRequest(searchInputValue, pageNumber);
  };

  const handleErrorReset = () => {
    setSearchInputValue("");
    setError(null);
    handleRequest("", 1);
  };

  useEffect(() => {
    handleRequest(searchInputValue, currentPage);
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
