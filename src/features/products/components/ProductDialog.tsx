import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductForm } from "./ProductForm";


import type { Product } from "../types/product.types";
import type { ProductFormData } from "../schemas/product.schema";
import type { Category } from "@/features/categories/types/category.schema";

interface ProductDialogProps {
  open: boolean;
  product?: Product | null;
  categories: Category[];
  isSubmitting?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: ProductFormData,
  ) => Promise<void>;
}

export function ProductDialog({
  open,
  product,
  categories,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: ProductDialogProps) {
  const isEditing = Boolean(product);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Editar producto"
              : "Nuevo producto"}
          </DialogTitle>
        </DialogHeader>

        <ProductForm
          product={product}
          categories={categories}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}