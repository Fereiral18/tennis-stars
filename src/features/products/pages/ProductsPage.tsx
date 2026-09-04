import { useState } from "react";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  function handleCreate(): void {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  }

  function handleEdit(product: Product): void {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }

  function handleDelete(product: Product): void {
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
      await deleteProduct(productToDelete.id);

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

  const isSaving = isCreating || isUpdating;

  const isLoading =
    isProductsLoading || isCategoriesLoading;

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <div
        className="
          min-h-full
          space-y-6
          bg-[#101214]
          text-[#F5F5F2]
        "
      >
        <PageHeader
          title="Productos"
          description="Administrá el catálogo de productos de tu tienda."
        />

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[#292E34]
            bg-[#181B1F]
            shadow-[0_12px_30px_rgba(0,0,0,0.14)]
          "
        >
          <LoadingState message="Cargando productos..." />
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (isProductsError) {
    return (
      <div
        className="
          min-h-full
          space-y-6
          bg-[#101214]
          text-[#F5F5F2]
        "
      >
        <PageHeader
          title="Productos"
          description="Administrá el catálogo de productos de tu tienda."
        />

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[#3D3435]
            bg-[#181B1F]
            shadow-[0_12px_30px_rgba(0,0,0,0.14)]
          "
        >
          <EmptyState
            title="No fue posible cargar los productos"
            description="Ocurrió un error al consultar los datos."
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-full
        space-y-6
        bg-[#101214]
        text-[#F5F5F2]
      "
    >
      {/* Page header */}
      <PageHeader
        title="Productos"
        description="Administrá el catálogo de productos de Court Store."
        action={
          <button
            type="button"
            onClick={handleCreate}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#574936]
              bg-[#D6A46A]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#171411]
              shadow-[0_8px_20px_rgba(0,0,0,0.16)]
              transition-all
              duration-200
              hover:border-[#6A5841]
              hover:bg-[#E0B77F]
              hover:shadow-[0_12px_26px_rgba(0,0,0,0.22)]
              active:scale-[0.98]
            "
          >
            <Plus
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:rotate-90
              "
            />

            Nuevo producto
          </button>
        }
      />

      {/* Products */}
      {products.length === 0 ? (
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-dashed
            border-[#343A40]
            bg-[#181B1F]
            shadow-[0_12px_30px_rgba(0,0,0,0.14)]
          "
        >
          <div className="px-4 py-2 sm:px-6">
            <EmptyState
              title="No hay productos"
              description="Creá tu primer producto para comenzar a construir el catálogo."
              action={
                <button
                  type="button"
                  onClick={handleCreate}
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#574936]
                    bg-[#D6A46A]
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-[#171411]
                    transition-all
                    duration-200
                    hover:border-[#6A5841]
                    hover:bg-[#E0B77F]
                    active:scale-[0.98]
                  "
                >
                  <Plus
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-200
                      group-hover:rotate-90
                    "
                  />

                  Crear producto
                </button>
              }
            />
          </div>
        </div>
      ) : (
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[#292E34]
            bg-[#181B1F]
            shadow-[0_12px_30px_rgba(0,0,0,0.14)]
          "
        >
          <ProductTable
            products={products}
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Product dialog */}
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

      {/* Delete confirmation */}
      <ConfirmDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
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
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}