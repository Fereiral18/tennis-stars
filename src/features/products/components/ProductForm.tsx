import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  productSchema,
  type ProductFormData,
  type ProductFormInput,
} from "../schemas/product.schema";


import { GENDER_LABELS } from "../constants/gender";

import type { Product, ProductOptionName } from "../types/product.types";
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

const OPTION_PLACEHOLDERS: Record<
  ProductOptionName,
  string
> = {
  Color: "Ej. Rojo",
  Talla: "Ej. 42",
};

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
    control,
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
      brand: product?.brand ?? "",
      gender: product?.gender ?? "UNISEX",
      categoryId:
        product?.categoryId ?? "",
      options:
        product?.options?.map(
          (option) => ({
            name: option.name,
            value: option.value,
          }),
        ) ?? [],
    },
  });

  const { fields, append, remove } =
    useFieldArray({
      control,
      name: "options",
    });

  const [
    optionToAdd,
    setOptionToAdd,
  ] = useState<"" | ProductOptionName>(
    "",
  );

  const imageUrl = watch("imageUrl");

  function handleAddOption(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const value = event.target
      .value as
      | ""
      | ProductOptionName;

    if (value) {
      append({ name: value, value: "" });
    }

    setOptionToAdd("");
  }

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

      {/* Marca y Género */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="product-brand"
            className="text-sm font-medium text-zinc-900"
          >
            Marca
          </label>

          <input
            id="product-brand"
            {...register("brand")}
            placeholder="Ej. Nike"
            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
          />

          {errors.brand && (
            <p className="text-xs text-red-500">
              {errors.brand.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product-gender"
            className="text-sm font-medium text-zinc-900"
          >
            Género
          </label>

          <select
            id="product-gender"
            {...register("gender")}
            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
          >
            {Object.entries(
              GENDER_LABELS,
            ).map(([value, label]) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>

          {errors.gender && (
            <p className="text-xs text-red-500">
              {errors.gender.message}
            </p>
          )}
        </div>
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

      {/* Opciones de producto */}
      <div className="space-y-2">
        <label
          htmlFor="product-option-add"
          className="text-sm font-medium text-zinc-900"
        >
          Opciones de producto
        </label>

        <select
          id="product-option-add"
          value={optionToAdd}
          onChange={handleAddOption}
          className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        >
          <option value="">
            Agregar opción...
          </option>

          <option value="Color">
            Color
          </option>

          <option value="Talla">
            Talla
          </option>
        </select>

        {fields.length > 0 && (
          <div className="space-y-2 pt-1">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2"
              >
                <span className="w-14 shrink-0 text-xs font-medium text-zinc-500">
                  {field.name}
                </span>

                <input
                  {...register(
                    `options.${index}.value`,
                  )}
                  placeholder={
                    OPTION_PLACEHOLDERS[
                      field.name
                    ]
                  }
                  className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    remove(index)
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  aria-label="Eliminar opción"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.options && (
          <p className="text-xs text-red-500">
            Revisá los valores de las opciones
          </p>
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
