import { useState } from "react";
import { Plus } from "lucide-react";

import {
  useCategories,
} from "../hooks/useCategories";

import {
  CategoryDialog,
} from "../components/CategoryDialog";

import {
  CategoryTable,
} from "../components/CategoryTable";


import type { CategoryFormData } from "../schemas/category.schema";
import type { Category } from "../types/category.schema";
import { PageHeader } from "../../../components/shared/PageHeader";
import { LoadingState } from "../../../components/shared/LoadingState";
import { EmptyState } from "../../../components/shared/EmptyState";
import { ConfirmDialog } from "../../../components/shared/ConfirmDialog";
import { toast } from "react-toastify";

export function CategoriesPage() {
  const {
    categories,
    isLoading,
    isError,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCategories();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [categoryToDelete, setCategoryToDelete] =
    useState<Category | null>(null);

  function handleCreate(): void {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  }

  function handleEdit(category: Category): void {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  }

  function handleDelete(category: Category): void {
    setCategoryToDelete(category);
  }

  async function handleSubmit(
    data: CategoryFormData,
  ): Promise<void> {
    try {
      if (selectedCategory) {
        await updateCategory({
          id: selectedCategory.id,
          input: data,
        });

        toast.success("Categoría actualizada correctamente");
      } else {
        await createCategory(data);

        toast.success("Categoría creada correctamente");
      }

      setIsDialogOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible guardar la categoría",
      );
    }
  }

  async function handleConfirmDelete(): Promise<void> {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);

      toast.success("Categoría eliminada correctamente");

      setCategoryToDelete(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar la categoría",
      );
    }
  }

  const isSaving = isCreating || isUpdating;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Categorías"
          description="Administrá las categorías de tu tienda."
        />

        <LoadingState message="Cargando categorías..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Categorías"
          description="Administrá las categorías de tu tienda."
        />

        <EmptyState
          title="No fue posible cargar las categorías"
          description="Ocurrió un error al consultar los datos."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorías"
        description="Administrá las categorías de productos de tu tienda."
        action={
          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            Nueva categoría
          </button>
        }
      />

      {categories.length === 0 ? (
        <EmptyState
          title="No hay categorías"
          description="Creá tu primera categoría para comenzar a organizar los productos."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" />
              Crear categoría
            </button>
          }
        />
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryDialog
        open={isDialogOpen}
        category={selectedCategory}
        isSubmitting={isSaving}
        onOpenChange={(open) => {
          if (!isSaving) {
            setIsDialogOpen(open);

            if (!open) {
              setSelectedCategory(null);
            }
          }
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setCategoryToDelete(null);
          }
        }}
        title="Eliminar categoría"
        description={
          categoryToDelete
            ? `¿Estás seguro de eliminar "${categoryToDelete.name}"? Esta acción no se puede deshacer.`
            : ""
        }
        confirmLabel="Eliminar"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}