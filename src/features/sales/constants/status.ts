import type {
  PaymentMethod,
  PaymentStatus,
  SaleStatus,
} from "../types/sale.types";

interface StatusDisplay {
  label: string;
  className: string;
}

export const saleStatusConfig: Record<
  SaleStatus,
  StatusDisplay
> = {
  PENDING: {
    label: "Pendiente",
    className:
      "bg-yellow-100 text-yellow-700",
  },

  CONFIRMED: {
    label: "Confirmada",
    className:
      "bg-blue-100 text-blue-700",
  },

  PREPARING: {
    label: "En preparación",
    className:
      "bg-orange-100 text-orange-700",
  },

  SHIPPED: {
    label: "Enviada",
    className:
      "bg-purple-100 text-purple-700",
  },

  DELIVERED: {
    label: "Entregada",
    className:
      "bg-green-100 text-green-700",
  },

  CANCELLED: {
    label: "Cancelada",
    className:
      "bg-red-100 text-red-700",
  },
};

export const paymentStatusConfig: Record<
  PaymentStatus,
  StatusDisplay
> = {
  PENDING: {
    label: "Pendiente",
    className:
      "bg-yellow-100 text-yellow-700",
  },

  PAID: {
    label: "Pagado",
    className:
      "bg-green-100 text-green-700",
  },
};

export const paymentMethodLabels: Record<
  PaymentMethod,
  string
> = {
  CASH: "Efectivo",
  TRANSFER: "Transferencia",
  CREDIT_CARD: "Tarjeta de crédito",
};
