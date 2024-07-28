import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import apiSlice from "../../api/api";

export default function useSearchLogic() {
  const [searchInputValue, setSearchInputValue] = useLocalStorage("search", "");

  const [trigger, { data, isLoading, error }] =
    apiSlice.useLazyGetCharactersQuery();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const handleRequest = (name: string, page: number) => {
    trigger({ name: name.trim(), page }, true);
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
    apiResponse: data,
    loading: isLoading,
    error,
    handleErrorReset,
  };
}
