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

import { formatSaleCode } from "../utils/formatSaleCode";

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

const CELL_BG = "bg-[#101214]";

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
        className: `${CELL_BG} whitespace-nowrap`,

        render: (sale) => (
          <div>
            <p
              className="font-mono text-sm font-semibold text-[#EDEEEB]"
              title={sale.id}
            >
              {formatSaleCode(sale.id)}
            </p>

            <p className="mt-0.5 text-xs text-[#7F878F]">
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
        className: CELL_BG,

        render: (sale) => (
          <div className="min-w-[160px] max-w-[220px]">
            <p className="truncate font-medium text-[#EDEEEB]">
              {sale.customerName}
            </p>

            <p className="mt-0.5 truncate text-xs text-[#7F878F]">
              {sale.customerEmail}
            </p>
          </div>
        ),
      },

      {
        key: "product",
        header: "Producto",
        className: CELL_BG,

        render: (sale) => {
          const item =
            sale.items[0];

          return (
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 shrink-0 text-[#656D75]" />

              <div className="min-w-0">
                <p className="max-w-[180px] truncate font-medium text-[#C1C5C9]">
                  {item.productName}
                </p>

                <p className="text-xs text-[#7F878F]">
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
        className: `${CELL_BG} whitespace-nowrap`,

        render: (sale) => (
          <span className="font-semibold text-[#E8C79F]">
            {formatCurrency(
              sale.total,
            )}
          </span>
        ),
      },

      {
        key: "status",
        header: "Estado",
        className: `${CELL_BG} whitespace-nowrap`,

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
        className: `${CELL_BG} whitespace-nowrap`,

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
        className: `${CELL_BG} whitespace-nowrap`,

        render: (sale) => (
          <button
            type="button"
            onClick={() =>
              onViewShipping(
                sale,
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#343A40] bg-[#20242A] px-2.5 py-1.5 text-xs font-medium text-[#AEB4B9] transition hover:border-[#4A5057] hover:bg-[#262B31] hover:text-[#F1F2EF]"
          >
            <Eye className="h-3.5 w-3.5" />

            Ver pedido
          </button>
        ),
      },

      {
        key: "actions",
        header: "",
        className: `${CELL_BG} w-16 text-right`,

        render: (sale) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent bg-transparent text-[#737B83] outline-none transition-all duration-200 hover:border-[#343A40] hover:bg-[#20242A] hover:text-[#EDEEEB] focus-visible:border-[#4A5057] focus-visible:ring-2 focus-visible:ring-[#D6A46A]/20"
              aria-label={`Cambiar estado de la venta ${formatSaleCode(sale.id)}`}
            >
              <MoreHorizontal className="h-[18px] w-[18px]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="min-w-[190px] rounded-xl border border-[#343A40] bg-[#181B1F] p-1.5 text-[#EDEEEB] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
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
                className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[#AEB4B9] outline-none transition-all duration-200 focus:bg-[#20242A] focus:text-[#F1F2EF]"
              >
                <PackageCheck className="mr-2.5 h-4 w-4 text-[#8B9299]" />
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
                className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[#AEB4B9] outline-none transition-all duration-200 focus:bg-[#20242A] focus:text-[#F1F2EF]"
              >
                <Truck className="mr-2.5 h-4 w-4 text-[#8B9299]" />
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
                className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[#C99A9D] outline-none transition-all duration-200 focus:bg-[#281E20] focus:text-[#D8A4A7]"
              >
                <XCircle className="mr-2.5 h-4 w-4 text-[#C99A9D]" />
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
