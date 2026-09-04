import { api } from "@/lib/axios";
import type { Sale } from "@/features/sales/types/sale.types";
import type { CustomerSummary } from "../types/customer.types";

function toCustomerSummaries(
  sales: Sale[],
): CustomerSummary[] {
  const byEmail = new Map<
    string,
    CustomerSummary
  >();

  for (const sale of sales) {
    const productsInSale = sale.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    const existing = byEmail.get(
      sale.customerEmail,
    );

    if (existing) {
      existing.totalOrders += 1;
      existing.totalProductsPurchased +=
        productsInSale;
    } else {
      byEmail.set(sale.customerEmail, {
        customerName: sale.customerName,
        customerEmail: sale.customerEmail,
        totalOrders: 1,
        totalProductsPurchased:
          productsInSale,
      });
    }
  }

  return Array.from(byEmail.values()).sort(
    (a, b) =>
      b.totalProductsPurchased -
      a.totalProductsPurchased,
  );
}

export const customerService = {
  async getSummary(): Promise<CustomerSummary[]> {
    const { data } = await api.get<Sale[]>(
      "/sales",
    );

    return toCustomerSummaries(data);
  },
};
