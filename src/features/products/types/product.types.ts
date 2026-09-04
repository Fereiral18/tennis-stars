import type { BaseEntity } from "@/types/common.types";

export type Gender = "MALE" | "FEMALE" | "UNISEX" | "KIDS";

export type ProductOptionName = "Color" | "Talla";

export interface ProductOption {
  id?: string;
  name: ProductOptionName;
  value: string;
}

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  gender: Gender;
  categoryId: string;
  options: ProductOption[];
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  gender: Gender;
  categoryId: string;
  options: ProductOption[];
}

export interface UpdateProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  gender: Gender;
  categoryId: string;
  options: ProductOption[];
}
