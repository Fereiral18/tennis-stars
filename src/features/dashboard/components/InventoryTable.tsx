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
          border-[#343A40]
          bg-[#181B1F]
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
            border-[#343A40]
            bg-[#20242A]
          "
        >
          <Package className="h-6 w-6 text-[#7F878F]" />
        </div>

        <p className="mt-4 text-sm font-semibold text-[#EDEEEB]">
          No hay productos registrados
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-[#737B83]">
          Los productos creados aparecerán aquí automáticamente.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-[#181B1F]">
      {/* =========================================================
          TABLE HEADER
      ========================================================== */}

      <div className="flex items-center justify-between border-b border-[#292E34] px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F2EF]">
            Productos registrados
          </h3>

          <p className="mt-0.5 text-xs text-[#737B83]">
            Últimos productos disponibles en el inventario
          </p>
        </div>

        {/* Product count */}

        <div
          className="
            rounded-full
            border
            border-[#343A40]
            bg-[#20242A]
            px-3
            py-1.5
          "
        >
          <span className="text-xs font-semibold text-[#AEB4B9]">
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
                  text-[#6F777F]
                  sm:px-6
                "
              >
                Precio
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#252A2F]">
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  group
                  transition-colors
                  duration-200
                  hover:bg-[#1D2126]
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
                        border-[#343A40]
                        bg-[#20242A]
                        transition-all
                        duration-200
                        group-hover:border-[#4A5057]
                        group-hover:bg-[#292E34]
                      "
                    >
                      <Package
                        className="
                          h-[17px]
                          w-[17px]
                          text-[#929AA2]
                          transition-colors
                          duration-200
                          group-hover:text-[#D6A46A]
                        "
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-[#EDEEEB]
                          transition-colors
                          group-hover:text-[#F5F5F2]
                        "
                      >
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#656D75]">
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
                        border-[#343A40]
                        bg-[#20242A]
                        px-2.5
                        py-1.5
                        text-xs
                        font-medium
                        text-[#AEB4B9]
                      "
                    >
                      <Tag className="h-3 w-3 text-[#8A929A]" />

                      {product.categoryId}
                    </span>
                  ) : (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-lg
                        border
                        border-[#3D3530]
                        bg-[#241F1B]
                        px-2.5
                        py-1.5
                        text-xs
                        font-medium
                        text-[#A99A8B]
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
                      text-[#E8C79F]
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
          border-[#292E34]
          bg-[#15181B]
          px-5
          py-3.5
          sm:px-6
        "
      >
        <p className="text-[11px] text-[#656D75]">
          Inventario de Court Store
        </p>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8BA78D]" />

          <span className="text-[11px] font-medium text-[#7F8981]">
            Inventario actualizado
          </span>
        </div>
      </div>
    </div>
  );
}