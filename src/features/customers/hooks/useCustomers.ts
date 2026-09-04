import { useCallback, useEffect, useState } from "react";

import { customerService } from "../services/customer.service";

import type { CustomerSummary } from "../types/customer.types";

interface UseCustomersReturn {
  customers: CustomerSummary[];
  isLoading: boolean;
  isError: boolean;
}

export function useCustomers(): UseCustomersReturn {
  const [customers, setCustomers] = useState<
    CustomerSummary[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCustomers = useCallback((): (() => void) => {
    let cancelled = false;

    customerService
      .getSummary()
      .then((data) => {
        if (cancelled) return;

        setCustomers(data);
        setIsError(false);
      })
      .catch(() => {
        if (!cancelled) setIsError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => fetchCustomers(), [fetchCustomers]);

  return {
    customers,
    isLoading,
    isError,
  };
}
