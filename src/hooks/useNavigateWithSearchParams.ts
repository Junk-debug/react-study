import { useNavigate, useSearchParams } from "react-router-dom";

export default function useNavigateWithSearchParams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (newRoute: string) => {
    navigate({
      pathname: newRoute,
      search: searchParams.toString(),
    });
  };
}
