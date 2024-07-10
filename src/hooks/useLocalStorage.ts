import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initValue: string) {
  const readValue = () => {
    const item = localStorage.getItem(key);
    return item !== null ? item : initValue;
  };

  const [value, setValue] = useState<string>(readValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
