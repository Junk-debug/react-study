import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { ApiError } from "../api/api";

type RequestFn<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

export default function useApiRequest<TArgs extends unknown[], TResult>(
  requestFn: RequestFn<TArgs, TResult>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<ApiError> | null>(null);

  const executeRequest = useCallback(
    async (...args: TArgs) => {
      try {
        setLoading(true);
        setError(null);
        const result = await requestFn(...args);
        return result;
      } catch (err) {
        setError(err as AxiosError<ApiError>);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [requestFn],
  );

  return {
    loading,
    error,
    executeRequest,
    resetError: () => setError(null),
  };
}
