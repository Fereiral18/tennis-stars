import { api } from "@/lib/axios";
import type {
  CreateSaleInput,
  PaymentStatus,
  Sale,
  SaleStatus,
} from "../types/sale.types";

export const saleService = {
  async getAll(): Promise<Sale[]> {
    const { data } = await api.get<Sale[]>("/sales");

    return data;
  },

  async getById(id: string): Promise<Sale | null> {
    const { data } = await api.get<Sale>(`/sales/${id}`);

    return data;
  },

  async create(input: CreateSaleInput): Promise<Sale> {
    const { data } = await api.post<Sale>("/sales", input);

    return data;
  },

  async updateStatus(
    id: string,
    status: SaleStatus,
  ): Promise<Sale> {
    const { data } = await api.patch<Sale>(
      `/sales/${id}/status`,
      { status },
    );

    return data;
  },

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
  ): Promise<Sale> {
    const { data } = await api.patch<Sale>(
      `/sales/${id}/payment-status`,
      { paymentStatus },
    );

    return data;
  },
};
