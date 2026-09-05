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
    "border-[var(--tt-icon-border-amber)] bg-[var(--tt-avatar-bg)] text-[var(--tt-accent)]",
  CONFIRMED:
    "border-[var(--tt-status-confirmed-border)] bg-[var(--tt-status-confirmed-bg)] text-[var(--tt-status-confirmed-text)]",
  PREPARING:
    "border-[var(--tt-status-preparing-border)] bg-[var(--tt-status-preparing-bg)] text-[var(--tt-status-preparing-text)]",
  SHIPPED:
    "border-[var(--tt-icon-border-purple)] bg-[var(--tt-icon-bg-purple)] text-[var(--tt-icon-text-purple)]",
  DELIVERED:
    "border-[var(--tt-icon-border-teal)] bg-[var(--tt-icon-bg-teal)] text-[var(--tt-icon-text-teal)]",
  CANCELLED:
    "border-[var(--tt-border-danger)] bg-[var(--tt-danger-bg-hover)] text-[var(--tt-danger-text)]",
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
          border-[var(--tt-border-strong)]
          bg-[var(--tt-bg-surface)]
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
            border-[var(--tt-border-strong)]
            bg-[var(--tt-bg-hover)]
          "
        >
          <ShoppingBag className="h-6 w-6 text-[var(--tt-text-tertiary)]" />
        </div>

        <p className="mt-4 text-sm font-semibold text-[var(--tt-text-primary-alt)]">
          No hay ventas registradas
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--tt-text-muted)]">
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
        border-[var(--tt-border)]
        bg-[var(--tt-bg-surface)]
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
          border-[var(--tt-border)]
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
                border-[var(--tt-avatar-border)]
                bg-[var(--tt-avatar-bg)]
              "
            >
              <ShoppingBag className="h-4 w-4 text-[var(--tt-accent)]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[var(--tt-text-primary-alt2)]">
                Ventas recientes
              </h2>

              <p className="mt-0.5 text-xs text-[var(--tt-text-muted)]">
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
            border-[var(--tt-border-strong)]
            bg-[var(--tt-bg-hover)]
            px-3
            py-2
            text-xs
            font-semibold
            text-[var(--tt-text-dropdown)]
            transition-all
            duration-200
            hover:border-[var(--tt-border-focus)]
            hover:bg-[var(--tt-border)]
            hover:text-[var(--tt-text-primary-alt2)]
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
          <thead className="border-b border-[var(--tt-border)] bg-[var(--tt-bg-page)]">
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
                  text-[var(--tt-text-icon-tertiary)]
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
                  text-[var(--tt-text-icon-tertiary)]
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
                  text-[var(--tt-text-icon-tertiary)]
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
                  text-[var(--tt-text-icon-tertiary)]
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
                  text-[var(--tt-text-icon-tertiary)]
                  sm:px-6
                "
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--tt-border)]">
            {sales.map((sale) => {
              const firstItem = sale.items[0];

              return (
                <tr
                  key={sale.id}
                  className="
                    group
                    transition-colors
                    duration-200
                    hover:bg-[var(--tt-bg-hover-alt)]
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
                          border-[var(--tt-border-strong)]
                          bg-[var(--tt-bg-hover)]
                          text-[var(--tt-text-faint)]
                          transition-all
                          duration-200
                          group-hover:border-[var(--tt-border-focus)]
                          group-hover:bg-[var(--tt-border)]
                          group-hover:text-[var(--tt-text-dropdown)]
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
                            text-[var(--tt-text-primary-alt)]
                            transition-colors
                            duration-200
                            group-hover:text-[var(--tt-text-primary)]
                          "
                        >
                          {sale.customerName}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <Mail className="h-3 w-3 shrink-0 text-[var(--tt-text-icon-secondary)]" />

                          <p
                            className="
                              truncate
                              text-[11px]
                              text-[var(--tt-text-icon-secondary)]
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
                          text-[var(--tt-text-strong)]
                        "
                      >
                        {firstItem?.productName ?? "Producto"}
                      </p>

                      {firstItem && (
                        <p className="mt-1 text-[11px] text-[var(--tt-text-icon-secondary)]">
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
                      text-[var(--tt-text-faint)]
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
                        text-[var(--tt-price-text)]
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
          border-[var(--tt-border)]
          bg-[var(--tt-bg-page)]
          px-5
          py-3.5
          sm:px-6
        "
      >
        <p className="text-[11px] text-[var(--tt-text-icon-secondary)]">
          Historial reciente de ventas
        </p>

        <div className="flex items-center gap-2">
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--tt-success)]
              shadow-[0_0_7px_rgba(139,167,141,0.35)]
            "
          />

          <span className="text-[11px] font-medium text-[var(--tt-text-tertiary)]">
            Actividad actualizada
          </span>
        </div>
      </div>
    </div>
  );
}