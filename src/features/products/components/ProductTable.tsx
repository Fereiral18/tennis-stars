import {
  Edit,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  DataTable,
  type DataTableColumn,
} from "@/components/shared/DataTable";


import type { Product } from "../types/product.types";
import type { Category } from "@/features/categories/types/category.schema";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({
  products,
  categories,
  onEdit,
  onDelete,
}: ProductTableProps) {
  function getCategoryName(
    categoryId: string,
  ): string {
    return (
      categories.find(
        (category) =>
          category.id === categoryId,
      )?.name ?? "Sin categoría"
    );
  }

  const columns: DataTableColumn<Product>[] = [
    {
      key: "product",
      header: "Producto",

      render: (product) => (
        <div className="flex min-w-[240px] items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src =
                  "https://placehold.co/100x100?text=Product";
              }}
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-900">
              {product.name}
            </p>

            <p className="mt-0.5 max-w-[280px] truncate text-xs text-zinc-500">
              {product.description}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      header: "Categoría",

      render: (product) => (
        <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
          {getCategoryName(
            product.categoryId,
          )}
        </span>
      ),
    },

    {
      key: "price",
      header: "Precio",

      render: (product) => (
        <span className="font-semibold text-zinc-900">
          {new Intl.NumberFormat(
            "es-AR",
            {
              style: "currency",
              currency: "USD",
            },
          ).format(product.price)}
        </span>
      ),
    },

    {
      key: "createdAt",
      header: "Creado",

      render: (product) =>
        new Intl.DateTimeFormat(
          "es-AR",
          {
            dateStyle: "medium",
          },
        ).format(
          new Date(product.createdAt),
        ),
    },

    {
      key: "actions",
      header: "",
      className: "w-16 text-right",

      render: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label={`Acciones para ${product.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                onEdit(product)
              }
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                onDelete(product)
              }
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      rowKey={(product) => product.id}
    />
  );
}