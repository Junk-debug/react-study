import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api, { CharactersResponse, ApiError } from "../../api/api";

export default function useSearchLogic() {
  const [search, setSearch] = useState<string>("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    localStorage.setItem("search", search);
    setCurrentPage(1);
    handleRequest(search, 1);
  };

  const handlePageButtonClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handleRequest(search, pageNumber);
  };

  const handleErrorReset = () => {
    localStorage.setItem("search", "");
    setSearch("");
    setError(null);
    handleRequest("", 1);
  };

  useEffect(() => {
    const searchFromLS = localStorage.getItem("search");

    if (searchFromLS !== null) {
      setSearch(searchFromLS);
      handleRequest(searchFromLS, currentPage);
    } else {
      handleRequest(search, currentPage);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    search,
    currentPage,
    apiResponse,
    error,
    isLoading,
    testError,
    handleSearchChange,
    handleSearchButtonClick,
    handlePageButtonClick,
    handleErrorReset,
    handleErrorButtonClick: () => setTestError(true),
  };
}
