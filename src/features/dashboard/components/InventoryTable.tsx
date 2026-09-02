import { Package } from "lucide-react";
import type { Product } from "@/features/products/types/product.types";

interface InventoryTableProps {
  products: Product[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function InventoryTable({
  products,
}: InventoryTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 text-center">
        <Package className="h-8 w-8 text-zinc-400" />

        <p className="mt-3 text-sm font-medium text-zinc-700">
          No hay productos registrados
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          Los productos creados aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Producto
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Categoría
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Precio
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition hover:bg-zinc-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                      <Package className="h-4 w-4 text-zinc-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {product.name}
                      </p>

                      <p className="text-xs text-zinc-400">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-zinc-600">
                  {product.categoryId ?? "Sin categoría"}
                </td>

                <td className="px-5 py-4 text-right text-sm font-semibold text-zinc-900">
                  {formatCurrency(product.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}