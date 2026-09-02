import {
  getStorage,
  setStorage,
} from "@/mocks/storage/mockStorage";

import { initialSales } from "@/mocks/data/sales.mock";

import type {
  CreateSaleInput,
  Sale,
} from "../types/sale.types";

import type { Product } from "@/features/products/types/product.types";

const STORAGE_KEY = "court-store-sales";

function delay(ms = 600): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, ms),
  );
}

function generateId(): string {
  return `sale-${Date.now()}`;
}

function getSalesFromStorage(): Sale[] {
  return getStorage<Sale[]>(
    STORAGE_KEY,
    initialSales,
  );
}

export const saleService = {
  async getAll(): Promise<Sale[]> {
    await delay();

    return getSalesFromStorage();
  },

  async getById(
    id: string,
  ): Promise<Sale | null> {
    await delay();

    const sales =
      getSalesFromStorage();

    return (
      sales.find(
        (sale) => sale.id === id,
      ) ?? null
    );
  },

  async create(
    input: CreateSaleInput,
    products: Product[],
  ): Promise<Sale> {
    await delay();

    const product = products.find(
      (item) =>
        item.id === input.productId,
    );

    if (!product) {
      throw new Error(
        "El producto seleccionado no existe",
      );
    }

    const subtotal =
      product.price * input.quantity;

    const now =
      new Date().toISOString();

    const sale: Sale = {
      id: generateId(),

      customerName:
        input.customerName,

      customerEmail:
        input.customerEmail,

      items: [
        {
          productId: product.id,
          productName: product.name,
          quantity: input.quantity,
          unitPrice: product.price,
          subtotal,
        },
      ],

      total: subtotal,

      status: "PENDING",

      shipping: {
        recipientName:
          input.shipping.recipientName,

        address:
          input.shipping.address,

        city:
          input.shipping.city,

        province:
          input.shipping.province,

        postalCode:
          input.shipping.postalCode,

        phone:
          input.shipping.phone,
      },

      createdAt: now,
      updatedAt: now,
    };

    const sales =
      getSalesFromStorage();

    setStorage(
      STORAGE_KEY,
      [...sales, sale],
    );

    return sale;
  },
};