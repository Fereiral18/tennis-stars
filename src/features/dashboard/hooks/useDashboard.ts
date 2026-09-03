import { useCallback, useEffect, useState } from "react";

import { useProducts } from "@/features/products/hooks/useProducts";
import { dashboardService } from "../services/dashboard.service";

import type { DashboardSummary } from "../types/dashboard.types";

const EMPTY_METRICS: DashboardSummary = {
  totalProducts: 0,
  totalCategories: 0,
  totalSales: 0,
  totalRevenue: 0,
  recentSales: [],
};

export function useDashboard() {
  const {
    products,
    isLoading: isProductsLoading,
  } = useProducts();

  const [summary, setSummary] =
    useState<DashboardSummary>(EMPTY_METRICS);

  const [isSummaryLoading, setIsSummaryLoading] =
    useState(true);

  const [isError, setIsError] = useState(false);

  const fetchSummary = useCallback((): (() => void) => {
    let cancelled = false;

    dashboardService
      .getSummary()
      .then((data) => {
        if (cancelled) return;

        setSummary(data);
        setIsError(false);
      })
      .catch(() => {
        if (!cancelled) setIsError(true);
      })
      .finally(() => {
        if (!cancelled) setIsSummaryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => fetchSummary(), [fetchSummary]);

  const { recentSales, ...metrics } = summary;

  return {
    products,
    recentSales,
    metrics,
    isLoading: isProductsLoading || isSummaryLoading,
    isError,
  };
}
