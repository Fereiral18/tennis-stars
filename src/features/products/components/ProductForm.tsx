import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  productSchema,
  type ProductFormData,
  type ProductFormInput,
} from "../schemas/product.schema";


import type { Product } from "../types/product.types";
import type { Category } from "@/features/categories/types/category.schema";

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  isSubmitting?: boolean;
  onSubmit: (
    data: ProductFormData,
  ) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({
  product,
  categories,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<
    ProductFormInput,
    unknown,
    ProductFormData
  >({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: product?.name ?? "",
      description:
        product?.description ?? "",
      price: product?.price ?? undefined,
      imageUrl: product?.imageUrl ?? "",
      categoryId:
        product?.categoryId ?? "",
    },
  });

  const imageUrl = watch("imageUrl");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Nombre */}
      <div className="space-y-2">
        <label
          htmlFor="product-name"
          className="text-sm font-medium text-zinc-900"
        >
          Nombre
        </label>

        <input
          id="product-name"
          {...register("name")}
          placeholder="Ej. Wilson Blade 98"
          className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errors.name && (
          <p className="text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <label
          htmlFor="product-category"
          className="text-sm font-medium text-zinc-900"
        >
          Categoría
        </label>

        <select
          id="product-category"
          {...register("categoryId")}
          className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        >
          <option value="">
            Seleccioná una categoría
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="text-xs text-red-500">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <label
          htmlFor="product-price"
          className="text-sm font-medium text-zinc-900"
        >
          Precio
        </label>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
            $
          </span>

          <input
            id="product-price"
            type="number"
            step="0.01"
            min="0"
            {...register("price")}
            placeholder="0.00"
            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white py-2 pl-8 pr-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
          />
        </div>

        {errors.price && (
          <p className="text-xs text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label
          htmlFor="product-description"
          className="text-sm font-medium text-zinc-900"
        >
          Descripción
        </label>

        <textarea
          id="product-description"
          {...register("description")}
          placeholder="Describe las características del producto..."
          rows={4}
          className="flex w-full resize-none rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errors.description && (
          <p className="text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Imagen */}
      <div className="space-y-2">
        <label
          htmlFor="product-image"
          className="text-sm font-medium text-zinc-900"
        >
          URL de imagen
        </label>

        <input
          id="product-image"
          type="url"
          {...register("imageUrl")}
          placeholder="https://..."
          className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errors.imageUrl && (
          <p className="text-xs text-red-500">
            {errors.imageUrl.message}
          </p>
        )}

        {imageUrl && !errors.imageUrl && (
          <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            <img
              src={imageUrl}
              alt="Vista previa"
              className="h-40 w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
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
            : product
              ? "Guardar cambios"
              : "Crear producto"}
        </button>
      </div>
    </form>
  );
}