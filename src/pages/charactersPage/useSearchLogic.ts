import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api, { CharactersResponse } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import useApiRequest from "../../hooks/useApiRequest";

export default function useSearchLogic() {
  const [searchInputValue, setSearchInputValue] = useLocalStorage("search", "");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const { executeRequest, loading, error, resetError } = useApiRequest(
    api.getCharacters,
  );

  const [apiResponse, setApiResponse] = useState<CharactersResponse | null>(
    null,
  );

  const handleRequest = (name: string, page: number) => {
    executeRequest({ name: name.trim(), page }).then((res) => {
      setApiResponse(res.data);
    });
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
    resetError();
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
    loading,
    error,
    handleErrorReset,
  };
}
