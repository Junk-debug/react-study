import { useRouter } from "next/router";
import { useState } from "react";

const useSearchLogic = (searchValue: string) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState(searchValue);

  const handleErrorReset = () => {
    setInputValue("");
    router.push({ query: {} });
  };

  const handlePageButtonClick = (pageNumber: number) => {
    const { query } = router;
    router.push({ query: { ...query, page: pageNumber } });
  };

  const handleSearchInputValueChange = (
    e: React.SyntheticEvent<HTMLInputElement>,
  ) => setInputValue(e.currentTarget.value);

  const handleSearchButtonClick = () => {
    router.push({ query: { search: inputValue } });
  };

  return {
    inputValue,
    handleSearchInputValueChange,
    handleSearchButtonClick,
    handlePageButtonClick,
    handleErrorReset,
  };
};

export default useSearchLogic;
