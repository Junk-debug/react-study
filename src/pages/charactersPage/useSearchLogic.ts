import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api, { CharactersResponse, ApiError } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function useSearchLogic() {
  const [searchInputValue, setSearchInputValue] = useLocalStorage("search", "");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const [apiResponse, setApiResponse] = useState<CharactersResponse | null>(
    null,
  );
  const [error, setError] = useState<AxiosError<ApiError> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRequest = (name: string, page: number) => {
    setIsLoading(true);
    setError(null);

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
    setSearchParams({ page: "1" });
    handleRequest(searchInputValue, 1);
  };

  const handlePageButtonClick = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
    handleRequest(searchInputValue, pageNumber);
  };

  const handleErrorReset = () => {
    setSearchInputValue("");
    setError(null);
    handleRequest("", 1);
  };

  useEffect(() => {
    handleRequest(searchInputValue, currentPage);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    searchInputValue,
    handleSearchInputChange,
    handleSearchButtonClick,
    currentPage,
    handlePageButtonClick,
    apiResponse,
    isLoading,
    error,
    handleErrorReset,
  };
}
