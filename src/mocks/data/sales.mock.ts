import type { Sale } from "@/features/sales/types/sale.types";

export const initialSales: Sale[] = [
  {
    id: "sale-001",

    customerName: "Carlos Rodríguez",

    customerEmail: "carlos@example.com",

    items: [
      {
        productId: "product-001",
        productName: "Wilson Blade 98",
        quantity: 1,
        unitPrice: 249.99,
        subtotal: 249.99,
      },
    ],

    total: 249.99,

    status: "DELIVERED",

    paymentMethod: "CREDIT_CARD",

    paymentStatus: "PAID",

    shipping: {
      recipientName: "Carlos Rodríguez",
      address: "Av. San Martín 1234",
      city: "Mendoza",
      province: "Mendoza",
      postalCode: "5500",
      phone: "+54 261 555 1234",
    },

    createdAt: "2026-08-20T14:30:00.000Z",
    updatedAt: "2026-08-23T14:30:00.000Z",
  },

  {
    id: "sale-002",

    customerName: "María González",

    customerEmail: "maria@example.com",

    items: [
      {
        productId: "product-003",
        productName: "Wilson US Open Balls",
        quantity: 3,
        unitPrice: 8.99,
        subtotal: 26.97,
      },
    ],

    total: 26.97,

    status: "SHIPPED",

    paymentMethod: "TRANSFER",

    paymentStatus: "PAID",

    shipping: {
      recipientName: "María González",
      address: "Calle Belgrano 845",
      city: "Buenos Aires",
      province: "Buenos Aires",
      postalCode: "1000",
      phone: "+54 11 5555 9876",
    },

    createdAt: "2026-08-25T16:00:00.000Z",
    updatedAt: "2026-08-26T12:00:00.000Z",
  },

  {
    id: "sale-003",

    customerName: "Julián Fernández",

    customerEmail: "julian@example.com",

    items: [
      {
        productId: "product-005",
        productName: "Asics Gel Resolution",
        quantity: 1,
        unitPrice: 139.99,
        subtotal: 139.99,
      },
    ],

    total: 139.99,

    status: "CONFIRMED",

    paymentMethod: "CASH",

    paymentStatus: "PENDING",

    shipping: {
      recipientName: "Julián Fernández",
      address: "Av. Córdoba 2450",
      city: "Córdoba",
      province: "Córdoba",
      postalCode: "5000",
      phone: "+54 351 555 4567",
    },

    createdAt: "2026-08-28T10:00:00.000Z",
    updatedAt: "2026-08-28T10:00:00.000Z",
  },
];