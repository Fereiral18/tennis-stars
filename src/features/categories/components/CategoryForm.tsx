import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  categorySchema,
  type CategoryFormData,
} from "../schemas/category.schema";
import type { Category } from "../types/category.schema";



interface CategoryFormProps {
  category?: Category | null;
  isSubmitting?: boolean;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({
  category,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="category-name"
          className="text-sm font-medium text-zinc-900"
        >
          Nombre
        </label>

        <input
          id="category-name"
          {...register("name")}
          placeholder="Ej. Raquetas"
          className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errors.name && (
          <p className="text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category-description"
          className="text-sm font-medium text-zinc-900"
        >
          Descripción
        </label>

        <textarea
          id="category-description"
          {...register("description")}
          placeholder="Describe brevemente la categoría..."
          rows={4}
          className="flex w-full resize-none rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errors.description && (
          <p className="text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          {isSubmitting
            ? "Guardando..."
            : category
              ? "Guardar cambios"
              : "Crear categoría"}
        </button>
      </div>
    </form>
  );
}