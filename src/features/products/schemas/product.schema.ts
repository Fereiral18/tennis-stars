import { z } from "zod";

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

  categoryId: z
    .string()
    .min(
      1,
      "Seleccioná una categoría",
    ),
});

export type ProductFormData =
  z.infer<typeof productSchema>;

export type ProductFormInput =
  z.input<typeof productSchema>;