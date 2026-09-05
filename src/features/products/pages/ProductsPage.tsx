import { useState } from "react";
import { Plus, Search } from "lucide-react";

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

  const [productSearch, setProductSearch] = useState("");

  const normalizedProductSearch = productSearch
    .trim()
    .toLowerCase();

  const filteredProducts =
    normalizedProductSearch.length >= 3
      ? products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(normalizedProductSearch),
        )
      : products;

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
          bg-[var(--tt-bg-page)]
          text-[var(--tt-text-primary)]
          p-4
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
            border-[var(--tt-border)]
            bg-[var(--tt-bg-surface)]
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
          bg-[var(--tt-bg-page)]
          text-[var(--tt-text-primary)]
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
            border-[var(--tt-border-danger)]
            bg-[var(--tt-bg-surface)]
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
        bg-[var(--tt-bg-page)]
        text-[var(--tt-text-primary)]
        p-4
      "
    >
      {/* Page header */}
      <PageHeader
        title="Productos"
        description="Administrá el catálogo de productos de Tennis Store."
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
              border-[var(--tt-accent-border)]
              bg-[var(--tt-accent)]
              px-4
              py-2.5
              mr-5
              text-sm
              font-semibold
              text-[var(--tt-accent-foreground)]
              shadow-[0_8px_20px_rgba(0,0,0,0.16)]
              transition-all
              duration-200
              hover:border-[var(--tt-accent-border-hover)]
              hover:bg-[var(--tt-accent-hover)]
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
            border-[var(--tt-border-strong)]
            bg-[var(--tt-bg-surface)]
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
                    border-[var(--tt-accent-border)]
                    bg-[var(--tt-accent)]
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-[var(--tt-accent-foreground)]
                    transition-all
                    duration-200
                    hover:border-[var(--tt-accent-border-hover)]
                    hover:bg-[var(--tt-accent-hover)]
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
        <div className="space-y-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--tt-text-muted)]" />

            <input
              type="text"
              value={productSearch}
              onChange={(event) =>
                setProductSearch(event.target.value)
              }
              placeholder="Buscar por nombre de producto..."
              className="h-10 w-full rounded-xl border border-[var(--tt-border-strong)] bg-[var(--tt-bg-surface)] pl-9 pr-3 text-sm text-[var(--tt-text-primary)] outline-none transition-colors focus:border-[var(--tt-accent)]"
            />
          </div>

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--tt-border)]
              bg-[var(--tt-bg-page)]
              shadow-[0_12px_30px_rgba(0,0,0,0.14)]
            "
          >
            {filteredProducts.length === 0 ? (
              <div className="px-4 py-2 sm:px-6">
                <EmptyState
                  title="No se encontraron productos"
                  description="Probá con otro nombre de producto."
                />
              </div>
            ) : (
              <ProductTable
                products={filteredProducts}
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
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