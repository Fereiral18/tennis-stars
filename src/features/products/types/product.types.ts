import type { BaseEntity } from "@/types/common.types";

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface UpdateProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}