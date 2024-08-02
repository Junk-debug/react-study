import { useRouter } from "next/router";
import { useState } from "react";

const useSearchLogic = (searchValue: string) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState(searchValue);

  const openDetailedCard = (detailedId: number) => {
    const { query } = router;
    router.push({ query: { ...query, detailedId } }, undefined, {
      scroll: false,
    });
  };

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
    openDetailedCard,
    handleErrorReset,
  };
};

export default useSearchLogic;
