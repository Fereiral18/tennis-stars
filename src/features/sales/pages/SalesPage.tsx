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
  SaleStatus,
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
    updateSaleStatus,
    updatePaymentStatus,

    isCreating,
    isUpdatingPayment,
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

  async function handleUpdateStatus(
    sale: Sale,
    status: SaleStatus,
  ): Promise<void> {
    try {
      await updateSaleStatus(
        sale.id,
        status,
      );

      toast.success(
        "Estado de la venta actualizado correctamente",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible actualizar el estado de la venta",
      );
    }
  }

  async function handleCompleteOrder(
    sale: Sale,
  ): Promise<void> {
    try {
      const updatedSale =
        await updatePaymentStatus(
          sale.id,
          "PAID",
        );

      setSelectedSale(updatedSale);

      toast.success(
        "Pedido completado y pago registrado correctamente",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No fue posible completar el pedido",
      );
    }
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

        paymentMethod:
          data.paymentMethod,

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
          onUpdateStatus={
            handleUpdateStatus
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
        sale={selectedSale}
        isCompleting={
          isUpdatingPayment
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
        onCompleteOrder={
          handleCompleteOrder
        }
      />
    </div>
  );
}