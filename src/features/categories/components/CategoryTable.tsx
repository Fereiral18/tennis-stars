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

const CELL_BG = "bg-[var(--tt-bg-page)]";

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
          <p className="font-medium text-[var(--tt-text-primary-alt)]">
            {category.name}
          </p>

          <p className="mt-0.5 text-xs text-[var(--tt-text-tertiary)]">
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
        <p className="max-w-xl truncate text-[var(--tt-text-secondary)]">
          {category.description}
        </p>
      ),
    },

    {
      key: "createdAt",
      header: "Creada",
      className: `${CELL_BG} whitespace-nowrap text-[var(--tt-text-secondary)]`,

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
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent bg-transparent text-[var(--tt-text-muted)] outline-none transition-all duration-200 hover:border-[var(--tt-border-strong)] hover:bg-[var(--tt-bg-hover)] hover:text-[var(--tt-text-primary-alt)] focus-visible:border-[var(--tt-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--tt-accent)]/20"
            aria-label={`Acciones para ${category.name}`}
          >
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="min-w-[175px] rounded-xl border border-[var(--tt-border-strong)] bg-[var(--tt-bg-surface)] p-1.5 text-[var(--tt-text-primary-alt)] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            <DropdownMenuItem
              onClick={() => onEdit(category)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[var(--tt-text-dropdown)] outline-none transition-all duration-200 focus:bg-[var(--tt-bg-hover)] focus:text-[var(--tt-text-primary-alt2)]"
            >
              <Edit className="mr-2.5 h-4 w-4 text-[var(--tt-text-icon-muted)]" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(category)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-xs font-medium text-[var(--tt-danger-text)] outline-none transition-all duration-200 focus:bg-[var(--tt-danger-bg-hover)] focus:text-[var(--tt-danger-text-hover)]"
            >
              <Trash2 className="mr-2.5 h-4 w-4 text-[var(--tt-danger-text)]" />
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
