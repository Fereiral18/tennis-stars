import type { BaseEntity } from "@/types/common.types";
import type { Gender } from "@/features/products/types/product.types";

export type SaleStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod =
  | "CASH"
  | "TRANSFER"
  | "CREDIT_CARD";

export type PaymentStatus =
  | "PENDING"
  | "PAID";

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
  gender: Gender;
  color: string | null;
  size: string | null;
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
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shipping: ShippingInfo;
}

export interface CreateSaleInput {
  customerName: string;
  customerEmail: string;
  productId: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  color?: string;
  size?: string;
  shipping: ShippingInfo;
}