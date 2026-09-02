import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



import type { Product } from "@/features/products/types/product.types";
import type { SaleFormData } from "../schemas/sale.schema";
import { SaleForm } from "./SalesForm";

interface SaleDialogProps {
  open: boolean;
  products: Product[];
  isSubmitting?: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
  onSubmit: (
    data: SaleFormData,
  ) => Promise<void>;
}

export function SaleDialog({
  open,
  products,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: SaleDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Generar nueva venta
          </DialogTitle>
        </DialogHeader>

        <SaleForm
          products={products}
          isSubmitting={
            isSubmitting
          }
          onSubmit={onSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}