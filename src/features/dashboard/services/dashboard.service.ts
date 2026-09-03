import { api } from "@/lib/axios";
import type { DashboardSummary } from "../types/dashboard.types";

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const { data } = await api.get<DashboardSummary>(
      "/dashboard/summary",
    );

    return data;
  },
};
