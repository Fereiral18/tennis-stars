import {
  getStorage,
  setStorage,
} from "@/mocks/storage/mockStorage";

import { initialSales } from "@/mocks/data/sales.mock";

import type {
  CreateSaleInput,
  PaymentStatus,
  Sale,
  SaleStatus,
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

function normalizeSale(
  sale: Sale,
): Sale {
  return {
    ...sale,
    paymentMethod:
      sale.paymentMethod ?? "CASH",
    paymentStatus:
      sale.paymentStatus ?? "PENDING",
  };
}

function getSalesFromStorage(): Sale[] {
  const sales = getStorage<Sale[]>(
    STORAGE_KEY,
    initialSales,
  );

  return sales.map(normalizeSale);
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

      paymentMethod:
        input.paymentMethod,

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

      paymentStatus: "PENDING",

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

  async updateStatus(
    id: string,
    status: SaleStatus,
  ): Promise<Sale> {
    await delay();

    const sales =
      getSalesFromStorage();

    const saleIndex =
      sales.findIndex(
        (sale) => sale.id === id,
      );

    if (saleIndex === -1) {
      throw new Error(
        "La venta no existe",
      );
    }

    const updatedSale: Sale = {
      ...sales[saleIndex],
      status,
      updatedAt:
        new Date().toISOString(),
    };

    const updatedSales = [
      ...sales,
    ];

    updatedSales[saleIndex] =
      updatedSale;

    setStorage(
      STORAGE_KEY,
      updatedSales,
    );

    return updatedSale;
  },

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
  ): Promise<Sale> {
    await delay();

    const sales =
      getSalesFromStorage();

    const saleIndex =
      sales.findIndex(
        (sale) => sale.id === id,
      );

    if (saleIndex === -1) {
      throw new Error(
        "La venta no existe",
      );
    }

    const updatedSale: Sale = {
      ...sales[saleIndex],
      paymentStatus,
      updatedAt:
        new Date().toISOString(),
    };

    const updatedSales = [
      ...sales,
    ];

    updatedSales[saleIndex] =
      updatedSale;

    setStorage(
      STORAGE_KEY,
      updatedSales,
    );

    return updatedSale;
  },
};