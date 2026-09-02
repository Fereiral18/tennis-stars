import { useCallback, useState } from "react";

interface UseMutationState<T> {
  data: T | null;
  error: unknown;
  isLoading: boolean;
}

export function useMutation<T, Args extends unknown[]>(
  mutationFn: (...args: Args) => Promise<T>,
) {
  const [state, setState] = useState<UseMutationState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const mutate = useCallback(
    async (...args: Args) => {
      setState({ data: null, error: null, isLoading: true });
      try {
        const data = await mutationFn(...args);
        setState({ data, error: null, isLoading: false });
        return data;
      } catch (error) {
        setState({ data: null, error, isLoading: false });
        throw error;
      }
    },
    [mutationFn],
  );

  return { ...state, mutate };
}
