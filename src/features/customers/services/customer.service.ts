import { api } from "@/lib/axios";
import type { CustomerSummary } from "../types/customer.types";

export const customerService = {
  async getSummary(): Promise<CustomerSummary[]> {
    const { data } = await api.get<CustomerSummary[]>(
      "/sales/customers",
    );

    return data;
  },
};
