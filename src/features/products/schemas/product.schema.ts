import { z } from "zod";

export const productOptionSchema = z.object({
  name: z.enum(["Color", "Talla"]),

  value: z
    .string()
    .trim()
    .min(1, "Ingresá un valor"),
});

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "El nombre debe tener al menos 2 caracteres",
    )
    .max(
      100,
      "El nombre no puede superar los 100 caracteres",
    ),

  description: z
    .string()
    .trim()
    .min(
      10,
      "La descripción debe tener al menos 10 caracteres",
    )
    .max(
      500,
      "La descripción no puede superar los 500 caracteres",
    ),

  price: z.coerce
    .number()
    .positive(
      "El precio debe ser mayor a 0",
    )
    .max(
      999999,
      "El precio es demasiado alto",
    ),

  imageUrl: z
    .string()
    .trim()
    .url(
      "Ingresá una URL de imagen válida",
    ),

  brand: z
    .string()
    .trim()
    .min(
      2,
      "La marca debe tener al menos 2 caracteres",
    )
    .max(
      50,
      "La marca no puede superar los 50 caracteres",
    ),

  gender: z.enum(
    ["MALE", "FEMALE", "UNISEX", "KIDS"],
    {
      error: "Seleccioná un género",
    },
  ),

  categoryId: z
    .string()
    .min(
      1,
      "Seleccioná una categoría",
    ),

  options: z
    .array(productOptionSchema)
    .default([]),
});

export type ProductFormData =
  z.infer<typeof productSchema>;

export type ProductFormInput =
  z.input<typeof productSchema>;
