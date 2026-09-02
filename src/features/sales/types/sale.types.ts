import type { BaseEntity } from "@/types/common.types";

export type SaleStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface ShippingInfo {
  recipientName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale extends BaseEntity {
  customerName: string;
  customerEmail: string;
  items: SaleItem[];
  total: number;
  status: SaleStatus;
  shipping: ShippingInfo;
}

export interface CreateSaleInput {
  customerName: string;
  customerEmail: string;
  productId: string;
  quantity: number;
  shipping: ShippingInfo;
}