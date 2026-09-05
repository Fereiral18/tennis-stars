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

import { GENDER_LABELS } from "../constants/gender";

import type { Product } from "../types/product.types";
import type { Category } from "@/features/categories/types/category.schema";

function getColorValues(product: Product): string {
  const colors = product.options
    .filter((option) => option.name === "Color")
    .map((option) => option.value);

  return colors.length > 0
    ? colors.join(", ")
    : "—";
}

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
  function getCategoryName(categoryId: string): string {
    return (
      categories.find(
        (category) => category.id === categoryId,
      )?.name ?? "Sin categoría"
    );
  }

  const columns: DataTableColumn<Product>[] = [
    {
      key: "product",
      header: "Producto",
      className: "min-w-[320px] bg-[var(--tt-bg-page)]",
      render: (product) => (
        <div className="group flex min-w-[280px] items-center gap-3.5  ">
          {/* Imagen */}
          <div
            className="
              relative
              h-12
              w-12
              shrink-0
              overflow-hidden
              rounded-xl
              border
              border-[var(--tt-border-strong)]
              bg-[var(--tt-bg-hover)]
              shadow-[0_6px_16px_rgba(0,0,0,0.14)]
              transition-all
              duration-300
              group-hover:border-[var(--tt-avatar-border)]
              group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)]
            "
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
              onError={(event) => {
                event.currentTarget.src =
                  "https://placehold.co/100x100?text=Product";
              }}
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-xl
                ring-1
                ring-inset
                ring-white/[0.05]
              "
            />
          </div>

          {/* Información */}
          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-semibold
                tracking-tight
                text-[var(--tt-text-primary-alt)]
                transition-colors
                duration-200
                group-hover:text-[var(--tt-text-primary)]
              "
            >
              {product.name}
            </p>

            <p
              className="
                mt-1
                max-w-[300px]
                truncate
                text-[11px]
                leading-5
                text-[var(--tt-text-icon-secondary)]
              "
            >
              {product.description || "Sin descripción"}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      header: "Categoría",
       className: "bg-[var(--tt-bg-page)]",
      render: (product) => {
        const categoryName = getCategoryName(product.categoryId);
        const hasCategory = categoryName !== "Sin categoría";

        return (
          <span
            className={`
              inline-flex
              items-center
              rounded-lg
              border
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              transition-all
              duration-200
              ${
                hasCategory
                  ? `
                    border-[var(--tt-avatar-border)]
                    bg-[var(--tt-avatar-bg)]
                    text-[#D0AE82]
                  `
                  : `
                    border-[var(--tt-border-strong)]
                    bg-[var(--tt-bg-hover)]
                    text-[var(--tt-text-muted)]
                  `
              }
            `}
          >
            {categoryName}
          </span>
        );
      },
    },

    {
      key: "brand",
      header: "Marca",
      className: "bg-[var(--tt-bg-page)]",
      render: (product) => (
        <span className="text-sm font-medium text-[#C1C5C9]">
          {product.brand}
        </span>
      ),
    },

    {
      key: "gender",
      header: "Género",
      className: "bg-[var(--tt-bg-page)]",
      render: (product) => (
        <span
          className="
            inline-flex
            items-center
            rounded-lg
            border
            border-[var(--tt-border-strong)]
            bg-[var(--tt-bg-hover)]
            px-2.5
            py-1.5
            text-[11px]
            font-semibold
            text-[var(--tt-text-dropdown)]
          "
        >
          {GENDER_LABELS[product.gender]}
        </span>
      ),
    },

    {
      key: "color",
      header: "Color",
      className: "bg-[var(--tt-bg-page)]",
      render: (product) => (
        <span className="text-sm text-[var(--tt-text-dropdown)]">
          {getColorValues(product)}
        </span>
      ),
    },

    {
      key: "price",
      header: "Precio",
       className: "bg-[var(--tt-bg-page)]",
      render: (product) => (
        <span
          className="
            whitespace-nowrap
            text-sm
            font-semibold
            tracking-tight
            text-[#E8C79F]
          "
        >
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </span>
      ),
    },

    {
      key: "createdAt",
      header: "Creado",
       className: "bg-[var(--tt-bg-page)]",
      render: (product) => (
        <span
          className="
            whitespace-nowrap
            text-xs
            font-medium
            text-[var(--tt-text-faint)]
          "
        >
          {new Intl.DateTimeFormat("es-AR", {
            dateStyle: "medium",
          }).format(new Date(product.createdAt))}
        </span>
      ),
    },

    {
      key: "actions",
      header: "",
      className: "w-16 text-right  bg-[var(--tt-bg-page)]",
      render: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-transparent
              bg-transparent
              text-[var(--tt-text-muted)]
              outline-none
              transition-all
              duration-200
              hover:border-[var(--tt-border-strong)]
              hover:bg-[var(--tt-bg-hover)]
              hover:text-[var(--tt-text-primary-alt)]
              focus-visible:border-[var(--tt-border-focus)]
              focus-visible:ring-2
              focus-visible:ring-[var(--tt-accent)]/20
            "
            aria-label={`Acciones para ${product.name}`}
          >
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="
              min-w-[175px]
              rounded-xl
              border
              border-[var(--tt-border-strong)]
              bg-[var(--tt-bg-surface)]
              p-1.5
              text-[var(--tt-text-primary-alt)]
              shadow-[0_18px_40px_rgba(0,0,0,0.35)]
            "
          >
            <DropdownMenuItem
              onClick={() => onEdit(product)}
              className="
                cursor-pointer
                rounded-lg
                px-3
                py-2.5
                text-xs
                font-medium
                text-[var(--tt-text-dropdown)]
                outline-none
                transition-all
                duration-200
                focus:bg-[var(--tt-bg-hover)]
                focus:text-[var(--tt-text-primary-alt2)]
              "
            >
              <Edit
                className="
                  mr-2.5
                  h-4
                  w-4
                  text-[var(--tt-text-icon-muted)]
                  transition-colors
                  duration-200
                  group-hover:text-[var(--tt-accent)]
                "
              />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(product)}
              className="
                cursor-pointer
                rounded-lg
                px-3
                py-2.5
                text-xs
                font-medium
                text-[var(--tt-danger-text)]
                outline-none
                transition-all
                duration-200
                focus:bg-[var(--tt-danger-bg-hover)]
                focus:text-[var(--tt-danger-text-hover)]
              "
            >
              <Trash2
                className="
                  mr-2.5
                  h-4
                  w-4
                  text-[var(--tt-danger-text)]
                "
              />
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