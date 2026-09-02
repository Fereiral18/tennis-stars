import { useState } from "react";
import { Plus } from "lucide-react";


import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

import { useCategories } from "@/features/categories/hooks/useCategories";

import {
  useProducts,
} from "../hooks/useProducts";

import { ProductDialog } from "../components/ProductDialog";
import { ProductTable } from "../components/ProductTable";

import type { Product } from "../types/product.types";
import type { ProductFormData } from "../schemas/product.schema";
import { toast } from "react-toastify";

export function ProductsPage() {
  const {
    products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating,
    isDeleting,
  } = useProducts();

  const {
    categories,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  function handleCreate(): void {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  }

  function handleEdit(
    product: Product,
  ): void {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }

  function handleDelete(
    product: Product,
  ): void {
    setProductToDelete(product);
  }

  async function handleSubmit(
    data: ProductFormData,
  ): Promise<void> {
    try {
      if (selectedProduct) {
        await updateProduct({
          id: selectedProduct.id,
          input: data,
        });

        toast.success(
          "Producto actualizado correctamente",
        );
      } else {
        await createProduct(data);

        toast.success(
          "Producto creado correctamente",
        );
      }

      setIsDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible guardar el producto",
      );
    }
  }

  async function handleConfirmDelete(): Promise<void> {
    if (!productToDelete) {
      return;
    }

    try {
      await deleteProduct(
        productToDelete.id,
      );

      toast.success(
        "Producto eliminado correctamente",
      );

      setProductToDelete(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar el producto",
      );
    }
  }

  const isSaving =
    isCreating || isUpdating;

  const isLoading =
    isProductsLoading ||
    isCategoriesLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Productos"
          description="Administrá el catálogo de productos de tu tienda."
        />

        <LoadingState message="Cargando productos..." />
      </div>
    );
  }

  if (isProductsError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Productos"
          description="Administrá el catálogo de productos de tu tienda."
        />

        <EmptyState
          title="No fue posible cargar los productos"
          description="Ocurrió un error al consultar los datos."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        description="Administrá el catálogo de productos de Court Store."
        action={
          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />

            Nuevo producto
          </button>
        }
      />

      {products.length === 0 ? (
        <EmptyState
          title="No hay productos"
          description="Creá tu primer producto para comenzar a construir el catálogo."
          action={
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" />

              Crear producto
            </button>
          }
        />
      ) : (
        <ProductTable
          products={products}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ProductDialog
        open={isDialogOpen}
        product={selectedProduct}
        categories={categories}
        isSubmitting={isSaving}
        onOpenChange={(open) => {
          if (!isSaving) {
            setIsDialogOpen(open);

            if (!open) {
              setSelectedProduct(null);
            }
          }
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (
            !open &&
            !isDeleting
          ) {
            setProductToDelete(null);
          }
        }}
        title="Eliminar producto"
        description={
          productToDelete
            ? `¿Estás seguro de eliminar "${productToDelete.name}"? Esta acción no se puede deshacer.`
            : ""
        }
        confirmLabel="Eliminar"
        isLoading={isDeleting}
        onConfirm={
          handleConfirmDelete
        }
      />
    </div>
  );
}