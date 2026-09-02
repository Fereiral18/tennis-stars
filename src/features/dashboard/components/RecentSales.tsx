import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Sale } from "@/features/sales/types/sale.types";

interface RecentSalesProps {
  sales: Sale[];
  onViewAll: () => void;
}

const statusLabels: Record<Sale["status"], string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  SHIPPED: "Enviada",
  DELIVERED: "Entregada",
  CANCELLED: "Cancelada",
};

const statusStyles: Record<Sale["status"], string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-blue-50 text-blue-700",
  SHIPPED: "bg-violet-50 text-violet-700",
  DELIVERED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
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
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
        <ShoppingBag className="mx-auto h-8 w-8 text-zinc-400" />

        <p className="mt-3 text-sm font-medium text-zinc-700">
          No hay ventas registradas
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-950">
            Ventas recientes
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Últimas ventas registradas
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="
            inline-flex
            items-center
            gap-1
            rounded-lg
            px-3
            py-2
            text-sm
            font-medium
            text-zinc-700
            transition
            hover:bg-zinc-100
          "
        >
          Ver todas
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Cliente
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Producto
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Fecha
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Estado
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Total
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {sales.map((sale) => {
              const firstItem = sale.items[0];

              return (
                <tr
                  key={sale.id}
                  className="transition hover:bg-zinc-50"
                >
                  <td className="px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {sale.customerName}
                      </p>

                      <p className="truncate text-xs text-zinc-400">
                        {sale.customerEmail}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-zinc-700">
                      {firstItem?.productName ?? "Producto"}
                    </p>

                    {firstItem && (
                      <p className="text-xs text-zinc-400">
                        Cantidad: {firstItem.quantity}
                      </p>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-zinc-600">
                    {formatDate(sale.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[sale.status]}`}
                    >
                      {statusLabels[sale.status]}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-semibold text-zinc-900">
                    {formatCurrency(sale.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}