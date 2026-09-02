import { useCallback, useEffect, useState } from "react";

import { saleService } from "../services/sale.service";

import type { CreateSaleInput, Sale } from "../types/sale.types";

import type { Product } from "@/features/products/types/product.types";

interface UseSalesReturn {
  sales: Sale[];
  isLoading: boolean;
  isError: boolean;
  createSale: (input: CreateSaleInput) => Promise<Sale>;
  isCreating: boolean;
}

export function useSales(products: Product[]): UseSalesReturn {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const fetchSales = useCallback((): (() => void) => {
    let cancelled = false;

    saleService
      .getAll()
      .then((data) => {
        if (cancelled) return;

        setSales(data);
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

  useEffect(() => fetchSales(), [fetchSales]);

  const createSale = useCallback(
    async (input: CreateSaleInput): Promise<Sale> => {
      try {
        setIsCreating(true);

        const sale = await saleService.create(input, products);

        setSales((previous) => [...previous, sale]);

        return sale;
      } finally {
        setIsCreating(false);
      }
    },
    [products],
  );

  return {
    sales,
    isLoading,
    isError,
    createSale,
    isCreating,
  };
}
