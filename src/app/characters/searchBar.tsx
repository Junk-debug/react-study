"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  disabled?: boolean;
}

const SearchBar: React.FC<Props> = ({ disabled }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  const handleClick = () => {
    const newPath = `/characters?search=${inputValue}`;
    router.push(newPath, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <Input
        placeholder="Type something"
        value={inputValue}
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button disabled={disabled} onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
