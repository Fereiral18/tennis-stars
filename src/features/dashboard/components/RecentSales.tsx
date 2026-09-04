import {
  ArrowUpRight,
  Mail,
  ShoppingBag,
  User,
} from "lucide-react";

import type { Sale } from "@/features/sales/types/sale.types";

interface RecentSalesProps {
  sales: Sale[];
  onViewAll: () => void;
}

const statusLabels: Record<Sale["status"], string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  PREPARING: "En preparación",
  SHIPPED: "Enviada",
  DELIVERED: "Entregada",
  CANCELLED: "Cancelada",
};

const statusStyles: Record<Sale["status"], string> = {
  PENDING:
    "border-[#4A3B28] bg-[#29231D] text-[#D6A46A]",
  CONFIRMED:
    "border-[#334047] bg-[#20282C] text-[#9EB4BD]",
  PREPARING:
    "border-[#493C2D] bg-[#28241F] text-[#D2AD7C]",
  SHIPPED:
    "border-[#40364B] bg-[#282230] text-[#B8A0D9]",
  DELIVERED:
    "border-[#304137] bg-[#1D2822] text-[#8FB6A0]",
  CANCELLED:
    "border-[#493334] bg-[#281E20] text-[#C99A9D]",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function RecentSales({
  sales,
  onViewAll,
}: RecentSalesProps) {
  if (sales.length === 0) {
    return (
      <div
        className="
          flex
          min-h-52
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          border-[#343A40]
          bg-[#181B1F]
          px-6
          text-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-[#343A40]
            bg-[#20242A]
          "
        >
          <ShoppingBag className="h-6 w-6 text-[#7F878F]" />
        </div>

        <p className="mt-4 text-sm font-semibold text-[#EDEEEB]">
          No hay ventas registradas
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-[#737B83]">
          Las ventas realizadas aparecerán aquí automáticamente.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[#292E34]
        bg-[#181B1F]
        shadow-[0_12px_30px_rgba(0,0,0,0.14)]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-[#292E34]
          px-5
          py-4
          sm:px-6
        "
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-[#40382F]
                bg-[#29231D]
              "
            >
              <ShoppingBag className="h-4 w-4 text-[#D6A46A]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#F1F2EF]">
                Ventas recientes
              </h2>

              <p className="mt-0.5 text-xs text-[#737B83]">
                Últimas ventas registradas
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="
            group
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded-xl
            border
            border-[#343A40]
            bg-[#20242A]
            px-3
            py-2
            text-xs
            font-semibold
            text-[#AEB4B9]
            transition-all
            duration-200
            hover:border-[#4A5057]
            hover:bg-[#292E34]
            hover:text-[#F1F2EF]
          "
        >
          Ver todas

          <ArrowUpRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-[#292E34] bg-[#15181B]">
            <tr>
              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#6F777F]
                  sm:px-6
                "
              >
                Cliente
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#6F777F]
                "
              >
                Producto
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#6F777F]
                "
              >
                Fecha
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#6F777F]
                "
              >
                Estado
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-right
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#6F777F]
                  sm:px-6
                "
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#252A2F]">
            {sales.map((sale) => {
              const firstItem = sale.items[0];

              return (
                <tr
                  key={sale.id}
                  className="
                    group
                    transition-colors
                    duration-200
                    hover:bg-[#1D2126]
                  "
                >
                  {/* Cliente */}
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-[#343A40]
                          bg-[#20242A]
                          text-[#858D95]
                          transition-all
                          duration-200
                          group-hover:border-[#4A5057]
                          group-hover:bg-[#292E34]
                          group-hover:text-[#AEB4B9]
                        "
                      >
                        <User className="h-[17px] w-[17px]" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-[#EDEEEB]
                            transition-colors
                            duration-200
                            group-hover:text-[#F5F5F2]
                          "
                        >
                          {sale.customerName}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <Mail className="h-3 w-3 shrink-0 text-[#5F676F]" />

                          <p
                            className="
                              truncate
                              text-[11px]
                              text-[#656D75]
                            "
                          >
                            {sale.customerEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Producto */}
                  <td className="px-5 py-4">
                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-[#D9DCDA]
                        "
                      >
                        {firstItem?.productName ?? "Producto"}
                      </p>

                      {firstItem && (
                        <p className="mt-1 text-[11px] text-[#656D75]">
                          Cantidad: {firstItem.quantity}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Fecha */}
                  <td
                    className="
                      whitespace-nowrap
                      px-5
                      py-4
                      text-xs
                      font-medium
                      text-[#858D95]
                    "
                  >
                    {formatDate(sale.createdAt)}
                  </td>

                  {/* Estado */}
                  <td className="px-5 py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-semibold
                        ${statusStyles[sale.status]}
                      `}
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-current
                          opacity-80
                        "
                      />

                      {statusLabels[sale.status]}
                    </span>
                  </td>

                  {/* Total */}
                  <td
                    className="
                      whitespace-nowrap
                      px-5
                      py-4
                      text-right
                      sm:px-6
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-semibold
                        tracking-tight
                        text-[#E8C79F]
                      "
                    >
                      {formatCurrency(sale.total)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-[#292E34]
          bg-[#15181B]
          px-5
          py-3.5
          sm:px-6
        "
      >
        <p className="text-[11px] text-[#656D75]">
          Historial reciente de ventas
        </p>

        <div className="flex items-center gap-2">
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#8BA78D]
              shadow-[0_0_7px_rgba(139,167,141,0.35)]
            "
          />

          <span className="text-[11px] font-medium text-[#7F8981]">
            Actividad actualizada
          </span>
        </div>
      </div>
    </div>
  );
}