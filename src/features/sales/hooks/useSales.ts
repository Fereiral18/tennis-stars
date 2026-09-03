import { useCallback, useEffect, useState } from "react";

import { saleService } from "../services/sale.service";

import type {
  CreateSaleInput,
  PaymentStatus,
  Sale,
  SaleStatus,
} from "../types/sale.types";

interface UseSalesReturn {
  sales: Sale[];
  isLoading: boolean;
  isError: boolean;
  createSale: (input: CreateSaleInput) => Promise<Sale>;
  updateSaleStatus: (
    id: string,
    status: SaleStatus,
  ) => Promise<Sale>;
  updatePaymentStatus: (
    id: string,
    paymentStatus: PaymentStatus,
  ) => Promise<Sale>;
  isCreating: boolean;
  isUpdatingStatus: boolean;
  isUpdatingPayment: boolean;
}

export function useSales(): UseSalesReturn {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] =
    useState(false);
  const [isUpdatingPayment, setIsUpdatingPayment] =
    useState(false);

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

        const sale = await saleService.create(input);

        setSales((previous) => [...previous, sale]);

        return sale;
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  const updateSaleStatus = useCallback(
    async (
      id: string,
      status: SaleStatus,
    ): Promise<Sale> => {
      try {
        setIsUpdatingStatus(true);

        const sale = await saleService.updateStatus(
          id,
          status,
        );

        setSales((previous) =>
          previous.map((item) =>
            item.id === id ? sale : item,
          ),
        );

        return sale;
      } finally {
        setIsUpdatingStatus(false);
      }
    },
    [],
  );

  const updatePaymentStatus = useCallback(
    async (
      id: string,
      paymentStatus: PaymentStatus,
    ): Promise<Sale> => {
      try {
        setIsUpdatingPayment(true);

        const sale = await saleService.updatePaymentStatus(
          id,
          paymentStatus,
        );

        setSales((previous) =>
          previous.map((item) =>
            item.id === id ? sale : item,
          ),
        );

        return sale;
      } finally {
        setIsUpdatingPayment(false);
      }
    },
    [],
  );

  return {
    sales,
    isLoading,
    isError,
    createSale,
    updateSaleStatus,
    updatePaymentStatus,
    isCreating,
    isUpdatingStatus,
    isUpdatingPayment,
  };
}
