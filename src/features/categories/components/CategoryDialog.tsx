import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { CategoryForm } from "./CategoryForm";


import type { CategoryFormData } from "../schemas/category.schema";
import type { Category } from "../types/category.schema";

interface CategoryDialogProps {
  open: boolean;
  category?: Category | null;
  isSubmitting?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

export function CategoryDialog({
  open,
  category,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: CategoryDialogProps) {
  const isEditing = Boolean(category);

  async function handleSubmit(
    data: CategoryFormData,
  ): Promise<void> {
    await onSubmit(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Editar categoría"
              : "Nueva categoría"}
          </DialogTitle>
        </DialogHeader>

        <CategoryForm
          category={category}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}