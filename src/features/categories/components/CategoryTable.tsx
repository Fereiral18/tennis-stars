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

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns: DataTableColumn<Category>[] = [
    {
      key: "name",
      header: "Categoría",

      render: (category) => (
        <div>
          <p className="font-medium text-zinc-900">
            {category.name}
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            ID: {category.id}
          </p>
        </div>
      ),
    },

    {
      key: "description",
      header: "Descripción",

      render: (category) => (
        <p className="max-w-xl truncate text-zinc-500">
          {category.description}
        </p>
      ),
    },

    {
      key: "createdAt",
      header: "Creada",

      render: (category) =>
        new Intl.DateTimeFormat("es-AR", {
          dateStyle: "medium",
        }).format(new Date(category.createdAt)),
    },

    {
      key: "actions",
      header: "",

      className: "w-16 text-right",

      render: (category) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label={`Acciones para ${category.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit(category)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(category)}
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
      data={categories}
      columns={columns}
      rowKey={(category) => category.id}
    />
  );
}