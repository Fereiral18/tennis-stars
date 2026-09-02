import { z } from "zod";

export const saleSchema = z.object({
  customerName: z
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

  customerEmail: z
    .string()
    .trim()
    .email(
      "Ingresá un email válido",
    ),

  productId: z
    .string()
    .min(
      1,
      "Seleccioná un producto",
    ),

  quantity: z.coerce
    .number()
    .int(
      "La cantidad debe ser un número entero",
    )
    .min(
      1,
      "La cantidad mínima es 1",
    )
    .max(
      100,
      "La cantidad máxima es 100",
    ),

  recipientName: z
    .string()
    .trim()
    .min(
      2,
      "Ingresá el nombre del destinatario",
    ),

  address: z
    .string()
    .trim()
    .min(
      5,
      "Ingresá una dirección válida",
    ),

  city: z
    .string()
    .trim()
    .min(
      2,
      "Ingresá una ciudad válida",
    ),

  province: z
    .string()
    .trim()
    .min(
      2,
      "Ingresá una provincia válida",
    ),

  postalCode: z
    .string()
    .trim()
    .min(
      3,
      "Ingresá un código postal válido",
    ),

  phone: z
    .string()
    .trim()
    .min(
      6,
      "Ingresá un teléfono válido",
    ),
});

export type SaleFormData =
  z.infer<typeof saleSchema>;

export type SaleFormInput =
  z.input<typeof saleSchema>;