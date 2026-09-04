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
      className: "min-w-[320px] bg-[#101214]",
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
              border-[#343A40]
              bg-[#20242A]
              shadow-[0_6px_16px_rgba(0,0,0,0.14)]
              transition-all
              duration-300
              group-hover:border-[#40382F]
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
                text-[#EDEEEB]
                transition-colors
                duration-200
                group-hover:text-[#F5F5F2]
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
                text-[#656D75]
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
       className: "bg-[#101214]",
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
                    border-[#40382F]
                    bg-[#29231D]
                    text-[#D0AE82]
                  `
                  : `
                    border-[#343A40]
                    bg-[#20242A]
                    text-[#737B83]
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
      key: "price",
      header: "Precio",
       className: "bg-[#101214]",
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
       className: "bg-[#101214]",
      render: (product) => (
        <span
          className="
            whitespace-nowrap
            text-xs
            font-medium
            text-[#858D95]
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
      className: "w-16 text-right  bg-[#101214]",
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
              text-[#737B83]
              outline-none
              transition-all
              duration-200
              hover:border-[#343A40]
              hover:bg-[#20242A]
              hover:text-[#EDEEEB]
              focus-visible:border-[#4A5057]
              focus-visible:ring-2
              focus-visible:ring-[#D6A46A]/20
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
              border-[#343A40]
              bg-[#181B1F]
              p-1.5
              text-[#EDEEEB]
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
                text-[#AEB4B9]
                outline-none
                transition-all
                duration-200
                focus:bg-[#20242A]
                focus:text-[#F1F2EF]
              "
            >
              <Edit
                className="
                  mr-2.5
                  h-4
                  w-4
                  text-[#8B9299]
                  transition-colors
                  duration-200
                  group-hover:text-[#D6A46A]
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
                text-[#C99A9D]
                outline-none
                transition-all
                duration-200
                focus:bg-[#281E20]
                focus:text-[#D8A4A7]
              "
            >
              <Trash2
                className="
                  mr-2.5
                  h-4
                  w-4
                  text-[#C99A9D]
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