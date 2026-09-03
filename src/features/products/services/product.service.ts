import { api } from "@/lib/axios";
import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/product.types";

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products");

    return data;
  },

  async getById(id: string): Promise<Product | null> {
    const { data } = await api.get<Product>(`/products/${id}`);

    return data;
  },

  async create(
    input: CreateProductInput,
  ): Promise<Product> {
    const { data } = await api.post<Product>("/products", input);

    return data;
  },

  async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<Product> {
    const { data } = await api.patch<Product>(
      `/products/${id}`,
      input,
    );

    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
