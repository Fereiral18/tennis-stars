import {
  Eye,
  MoreHorizontal,
  Package,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

import {
  DataTable,
  type DataTableColumn,
} from "@/components/shared/DataTable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  paymentStatusConfig,
  saleStatusConfig,
} from "../constants/status";

import type {
  Sale,
  SaleStatus,
} from "../types/sale.types";

interface SaleTableProps {
  sales: Sale[];
  onViewShipping: (
    sale: Sale,
  ) => void;
  onUpdateStatus: (
    sale: Sale,
    status: SaleStatus,
  ) => void;
}

export function SaleTable({
  sales,
  onViewShipping,
  onUpdateStatus,
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
            saleStatusConfig[
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
        key: "payment",
        header: "Pago",

        render: (sale) => {
          const payment =
            paymentStatusConfig[
              sale.paymentStatus
            ];

          return (
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${payment.className}`}
            >
              {payment.label}
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

            Ver pedido
          </button>
        ),
      },

      {
        key: "actions",
        header: "",
        className: "w-16 text-right",

        render: (sale) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
              aria-label={`Cambiar estado de ${sale.id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled={
                  sale.status === "PREPARING"
                }
                onClick={() =>
                  onUpdateStatus(
                    sale,
                    "PREPARING",
                  )
                }
              >
                <PackageCheck className="mr-2 h-4 w-4" />
                En preparación
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={
                  sale.status === "SHIPPED"
                }
                onClick={() =>
                  onUpdateStatus(
                    sale,
                    "SHIPPED",
                  )
                }
              >
                <Truck className="mr-2 h-4 w-4" />
                Enviado
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={
                  sale.status === "CANCELLED"
                }
                onClick={() =>
                  onUpdateStatus(
                    sale,
                    "CANCELLED",
                  )
                }
                className="text-red-600 focus:text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancelado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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