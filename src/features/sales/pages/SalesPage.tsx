import {
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import {
  PageHeader,
} from "@/components/shared/PageHeader";

import {
  LoadingState,
} from "@/components/shared/LoadingState";

import {
  EmptyState,
} from "@/components/shared/EmptyState";

import {
  useProducts,
} from "@/features/products/hooks/useProducts";

import {
  useSales,
} from "../hooks/useSales";


import type {
  Sale,
} from "../types/sale.types";

import type {
  SaleFormData,
} from "../schemas/sale.schema";
import { SaleTable } from "../components/SaleTable";
import { SaleDialog } from "../components/GenerateSaleDialog";
import { ShippingDialog } from "../components/SaleShippingDialog";

export function SalesPage() {
  const {
    products,
    isLoading:
      isProductsLoading,
  } = useProducts();

  const {
    sales,
    isLoading:
      isSalesLoading,

    isError:
      isSalesError,

    createSale,

    isCreating,
  } = useSales(products);

  const [
    isSaleDialogOpen,
    setIsSaleDialogOpen,
  ] = useState(false);

  const [
    selectedSale,
    setSelectedSale,
  ] = useState<Sale | null>(
    null,
  );

  const [
    isShippingDialogOpen,
    setIsShippingDialogOpen,
  ] = useState(false);

  function handleCreateSale(): void {
    setIsSaleDialogOpen(true);
  }

  function handleViewShipping(
    sale: Sale,
  ): void {
    setSelectedSale(sale);

    setIsShippingDialogOpen(
      true,
    );
  }

  async function handleSubmit(
    data: SaleFormData,
  ): Promise<void> {
    try {
      await createSale({
        customerName:
          data.customerName,

        customerEmail:
          data.customerEmail,

        productId:
          data.productId,

        quantity:
          data.quantity,

        shipping: {
          recipientName:
            data.recipientName,

          address:
            data.address,

          city:
            data.city,

          province:
            data.province,

          postalCode:
            data.postalCode,

          phone:
            data.phone,
        },
      });

      toast.success(
        "Venta generada correctamente",
      );

      setIsSaleDialogOpen(
        false,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible generar la venta",
      );
    }
  }

  const isLoading =
    isProductsLoading ||
    isSalesLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Ventas"
          description="Consultá y registrá las ventas de Court Store."
        />

        <LoadingState message="Cargando ventas..." />
      </div>
    );
  }

  if (isSalesError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Ventas"
          description="Consultá y registrá las ventas de Court Store."
        />

        <EmptyState
          title="No fue posible cargar las ventas"
          description="Ocurrió un error al consultar los datos."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ventas"
        description="Consultá y registrá las ventas de Court Store."
        action={
          <button
            type="button"
            onClick={
              handleCreateSale
            }
            disabled={
              products.length ===
              0
            }
            className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />

            Generar venta
          </button>
        }
      />

      {products.length === 0 ? (
        <EmptyState
          title="No hay productos disponibles"
          description="Necesitás crear al menos un producto antes de generar una venta."
        />
      ) : sales.length === 0 ? (
        <EmptyState
          title="No hay ventas"
          description="Generá tu primera venta para comenzar a registrar operaciones."
          action={
            <button
              type="button"
              onClick={
                handleCreateSale
              }
              className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" />

              Generar venta
            </button>
          }
        />
      ) : (
        <SaleTable
          sales={sales}
          onViewShipping={
            handleViewShipping
          }
        />
      )}

      <SaleDialog
        open={
          isSaleDialogOpen
        }
        products={products}
        isSubmitting={
          isCreating
        }
        onOpenChange={(
          open,
        ) => {
          if (!isCreating) {
            setIsSaleDialogOpen(
              open,
            );
          }
        }}
        onSubmit={
          handleSubmit
        }
      />

      <ShippingDialog
        open={
          isShippingDialogOpen
        }
        shipping={
          selectedSale?.shipping ??
          null
        }
        onOpenChange={(
          open,
        ) => {
          setIsShippingDialogOpen(
            open,
          );

          if (!open) {
            setSelectedSale(
              null,
            );
          }
        }}
      />
    </div>
  );
}