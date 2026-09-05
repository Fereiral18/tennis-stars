import { Package, Tag } from "lucide-react";

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
        {/* Icon */}

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
          <Package className="h-6 w-6 text-[var(--tt-text-tertiary)]" />
        </div>

        <p className="mt-4 text-sm font-semibold text-[var(--tt-text-primary-alt)]">
          No hay productos registrados
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--tt-text-muted)]">
          Los productos creados aparecerán aquí automáticamente.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-[var(--tt-bg-surface)]">
      {/* =========================================================
          TABLE HEADER
      ========================================================== */}

      <div className="flex items-center justify-between border-b border-[var(--tt-border)] px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-sm font-semibold text-[var(--tt-text-primary-alt2)]">
            Productos registrados
          </h3>

          <p className="mt-0.5 text-xs text-[var(--tt-text-muted)]">
            Últimos productos disponibles en el inventario
          </p>
        </div>

        {/* Product count */}

        <div
          className="
            rounded-full
            border
            border-[var(--tt-border-strong)]
            bg-[var(--tt-bg-hover)]
            px-3
            py-1.5
          "
        >
          <span className="text-xs font-semibold text-[var(--tt-text-dropdown)]">
            {products.length}{" "}
            {products.length === 1 ? "producto" : "productos"}
          </span>
        </div>
      </div>

      {/* =========================================================
          TABLE
      ========================================================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
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
                Categoría
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
                Precio
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--tt-border)]">
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  group
                  transition-colors
                  duration-200
                  hover:bg-[var(--tt-bg-hover-alt)]
                "
              >
                {/* =================================================
                    PRODUCT
                ================================================== */}

                <td className="px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3.5">
                    {/* Product icon */}

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
                        transition-all
                        duration-200
                        group-hover:border-[var(--tt-border-focus)]
                        group-hover:bg-[var(--tt-border)]
                      "
                    >
                      <Package
                        className="
                          h-[17px]
                          w-[17px]
                          text-[var(--tt-text-icon-tertiary)]
                          transition-colors
                          duration-200
                          group-hover:text-[var(--tt-accent)]
                        "
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-[var(--tt-text-primary-alt)]
                          transition-colors
                          group-hover:text-[var(--tt-text-primary)]
                        "
                      >
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-[var(--tt-text-icon-secondary)]">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* =================================================
                    CATEGORY
                ================================================== */}

                <td className="px-5 py-4">
                  {product.categoryId ? (
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-[var(--tt-border-strong)]
                        bg-[var(--tt-bg-hover)]
                        px-2.5
                        py-1.5
                        text-xs
                        font-medium
                        text-[var(--tt-text-dropdown)]
                      "
                    >
                      <Tag className="h-3 w-3 text-[var(--tt-text-icon-muted)]" />

                      {product.categoryId}
                    </span>
                  ) : (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-lg
                        border
                        border-[var(--tt-badge-muted-border)]
                        bg-[var(--tt-badge-muted-bg)]
                        px-2.5
                        py-1.5
                        text-xs
                        font-medium
                        text-[var(--tt-badge-muted-text)]
                      "
                    >
                      Sin categoría
                    </span>
                  )}
                </td>

                {/* =================================================
                    PRICE
                ================================================== */}

                <td className="px-5 py-4 text-right sm:px-6">
                  <span
                    className="
                      text-sm
                      font-semibold
                      tracking-tight
                      text-[var(--tt-price-text)]
                    "
                  >
                    {formatCurrency(product.price)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================================================
          TABLE FOOTER
      ========================================================== */}

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
          Inventario de Court Store
        </p>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--tt-success)]" />

          <span className="text-[11px] font-medium text-[var(--tt-text-tertiary)]">
            Inventario actualizado
          </span>
        </div>
      </div>
    </div>
  );
}