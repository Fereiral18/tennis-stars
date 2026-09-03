import type { Sale } from "@/features/sales/types/sale.types";

export interface DashboardMetrics {
  totalProducts: number;
  totalCategories: number;
  totalSales: number;
  totalRevenue: number;
}

export interface DashboardSummary extends DashboardMetrics {
  recentSales: Sale[];
}
