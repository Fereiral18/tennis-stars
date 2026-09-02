import {
  Eye,
  Package,
} from "lucide-react";

import {
  DataTable,
  type DataTableColumn,
} from "@/components/shared/DataTable";

import type {
  Sale,
  SaleStatus,
} from "../types/sale.types";

interface SaleTableProps {
  sales: Sale[];
  onViewShipping: (
    sale: Sale,
  ) => void;
}

const statusConfig: Record<
  SaleStatus,
  {
    label: string;
    className: string;
  }
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

export function SaleTable({
  sales,
  onViewShipping,
}: SaleTableProps) {
  const formatCurrency = (
    value: number,
  ) =>
    new Intl.NumberFormat(
      "es-AR",
      {
        style: "currency",
        currency: "USD",
      },
    ).format(value);

  const columns: DataTableColumn<Sale>[] =
    [
      {
        key: "id",
        header: "Venta",

        render: (sale) => (
          <div>
            <p className="font-semibold text-zinc-900">
              {sale.id}
            </p>

            <p className="mt-0.5 text-xs text-zinc-500">
              {new Intl.DateTimeFormat(
                "es-AR",
                {
                  dateStyle:
                    "medium",
                },
              ).format(
                new Date(
                  sale.createdAt,
                ),
              )}
            </p>
          </div>
        ),
      },

      {
        key: "customer",
        header: "Cliente",

        render: (sale) => (
          <div className="min-w-[180px]">
            <p className="font-medium text-zinc-900">
              {sale.customerName}
            </p>

            <p className="mt-0.5 text-xs text-zinc-500">
              {sale.customerEmail}
            </p>
          </div>
        ),
      },

      {
        key: "product",
        header: "Producto",

        render: (sale) => {
          const item =
            sale.items[0];

          return (
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 shrink-0 text-zinc-400" />

              <div>
                <p className="max-w-[200px] truncate font-medium text-zinc-800">
                  {item.productName}
                </p>

                <p className="text-xs text-zinc-500">
                  Cantidad:{" "}
                  {item.quantity}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        key: "total",
        header: "Total",

        render: (sale) => (
          <span className="font-semibold text-zinc-900">
            {formatCurrency(
              sale.total,
            )}
          </span>
        ),
      },

      {
        key: "status",
        header: "Estado",

        render: (sale) => {
          const status =
            statusConfig[
              sale.status
            ];

          return (
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
            >
              {status.label}
            </span>
          );
        },
      },

      {
        key: "shipping",
        header: "Envío",

        render: (sale) => (
          <button
            type="button"
            onClick={() =>
              onViewShipping(
                sale,
              )
            }
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            <Eye className="h-3.5 w-3.5" />

            Ver envío
          </button>
        ),
      },
    ];

  return (
    <DataTable
      data={sales}
      columns={columns}
      rowKey={(sale) => sale.id}
    />
  );
}