import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category } from "../types/category.schema";
import { DataTable, type DataTableColumn } from "../../../components/shared/DataTable";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CELL_BG = "bg-[#101214]";

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns: DataTableColumn<Category>[] = [
    {
      key: "name",
      header: "Categoría",
      className: CELL_BG,

      render: (category) => (
        <div>
          <p className="font-medium text-[#EDEEEB]">
            {category.name}
          </p>

          <p className="mt-0.5 text-xs text-[#7F878F]">
            ID: {category.id}
          </p>
        </div>
      ),
    },

    {
      key: "description",
      header: "Descripción",
      className: CELL_BG,

      render: (category) => (
        <p className="max-w-xl truncate text-[#8F969D]">
          {category.description}
        </p>
      ),
    },

    {
      key: "createdAt",
      header: "Creada",
      className: `${CELL_BG} whitespace-nowrap text-[#8F969D]`,

      render: (category) =>
        new Intl.DateTimeFormat("es-AR", {
          dateStyle: "medium",
        }).format(new Date(category.createdAt)),
    },

    {
      key: "actions",
      header: "",
      className: `${CELL_BG} w-16 text-right`,

      render: (category) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent bg-transparent text-[#737B83] outline-none transition-all duration-200 hover:border-[#343A40] hover:bg-[#20242A] hover:text-[#EDEEEB] focus-visible:border-[#4A5057] focus-visible:ring-2 focus-visible:ring-[#D6A46A]/20"
            aria-label={`Acciones para ${category.name}`}
          >
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="min-w-[175px] rounded-xl border border-[#343A40] bg-[#181B1F] p-1.5 text-[#EDEEEB] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            <DropdownMenuItem
              onClick={() => onEdit(category)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[#AEB4B9] outline-none transition-all duration-200 focus:bg-[#20242A] focus:text-[#F1F2EF]"
            >
              <Edit className="mr-2.5 h-4 w-4 text-[#8B9299]" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(category)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[#C99A9D] outline-none transition-all duration-200 focus:bg-[#281E20] focus:text-[#D8A4A7]"
            >
              <Trash2 className="mr-2.5 h-4 w-4 text-[#C99A9D]" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={categories}
      columns={columns}
      rowKey={(category) => category.id}
    />
  );
}
