import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  Loader2,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  saleSchema,
  type SaleFormData,
  type SaleFormInput,
} from "../schemas/sale.schema";

import type { Product } from "@/features/products/types/product.types";

interface SaleFormProps {
  products: Product[];
  isSubmitting?: boolean;
  onSubmit: (
    data: SaleFormData,
  ) => Promise<void>;
  onCancel: () => void;
}

export function SaleForm({
  products,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: SaleFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    },
  } = useForm<
    SaleFormInput,
    unknown,
    SaleFormData
  >({
    resolver:
      zodResolver(saleSchema),

    defaultValues: {
      customerName: "",
      customerEmail: "",
      productId: "",
      quantity: 1,
      recipientName: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
    },
  });

  const selectedProductId =
    watch("productId");

  const quantity = Number(
    watch("quantity"),
  );

  const selectedProduct =
    products.find(
      (product) =>
        product.id ===
        selectedProductId,
    );

  const total =
    selectedProduct &&
    quantity > 0
      ? selectedProduct.price *
        quantity
      : 0;

  const formatCurrency = (
    value: number,
  ) =>
    new Intl.NumberFormat(
      "es-AR",
      {
        style: "currency",
        currency: "USD",
      },
    ).format(value);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7"
    >
      {/* Cliente */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">
            Información del cliente
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Datos de contacto del comprador.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="customerName"
              className="text-sm font-medium text-zinc-900"
            >
              Nombre
            </label>

            <input
              id="customerName"
              {...register(
                "customerName",
              )}
              placeholder="Carlos Rodríguez"
              className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errors.customerName && (
              <p className="text-xs text-red-500">
                {
                  errors
                    .customerName
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="customerEmail"
              className="text-sm font-medium text-zinc-900"
            >
              Email
            </label>

            <input
              id="customerEmail"
              type="email"
              {...register(
                "customerEmail",
              )}
              placeholder="cliente@email.com"
              className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errors.customerEmail && (
              <p className="text-xs text-red-500">
                {
                  errors
                    .customerEmail
                    .message
                }
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Producto */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">
            Producto
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Seleccioná el producto que forma parte de la venta.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <label
              htmlFor="productId"
              className="text-sm font-medium text-zinc-900"
            >
              Producto
            </label>

            <select
              id="productId"
              {...register(
                "productId",
              )}
              className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            >
              <option value="">
                Seleccioná un producto
              </option>

              {products.map(
                (product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name} —{" "}
                    {formatCurrency(
                      product.price,
                    )}
                  </option>
                ),
              )}
            </select>

            {errors.productId && (
              <p className="text-xs text-red-500">
                {
                  errors
                    .productId
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="text-sm font-medium text-zinc-900"
            >
              Cantidad
            </label>

            <input
              id="quantity"
              type="number"
              min="1"
              max="100"
              {...register(
                "quantity",
              )}
              className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errors.quantity && (
              <p className="text-xs text-red-500">
                {
                  errors
                    .quantity
                    .message
                }
              </p>
            )}
          </div>
        </div>

        {selectedProduct && (
          <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3">
            <div>
              <p className="text-xs text-zinc-500">
                Precio unitario
              </p>

              <p className="text-sm font-semibold text-zinc-900">
                {formatCurrency(
                  selectedProduct.price,
                )}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-500">
                Total
              </p>

              <p className="text-lg font-semibold text-zinc-950">
                {formatCurrency(
                  total,
                )}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Envío */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">
            Información de envío
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Dirección donde se entregará el pedido.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="recipientName"
              className="text-sm font-medium text-zinc-900"
            >
              Destinatario
            </label>

            <input
              id="recipientName"
              {...register(
                "recipientName",
              )}
              placeholder="Nombre del destinatario"
              className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errors.recipientName && (
              <p className="text-xs text-red-500">
                {
                  errors
                    .recipientName
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium text-zinc-900"
            >
              Dirección
            </label>

            <input
              id="address"
              {...register(
                "address",
              )}
              placeholder="Av. San Martín 1234"
              className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errors.address && (
              <p className="text-xs text-red-500">
                {
                  errors
                    .address
                    .message
                }
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-zinc-900"
              >
                Ciudad
              </label>

              <input
                id="city"
                {...register(
                  "city",
                )}
                placeholder="Mendoza"
                className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
              />

              {errors.city && (
                <p className="text-xs text-red-500">
                  {
                    errors.city
                      .message
                  }
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="province"
                className="text-sm font-medium text-zinc-900"
              >
                Provincia
              </label>

              <input
                id="province"
                {...register(
                  "province",
                )}
                placeholder="Mendoza"
                className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
              />

              {errors.province && (
                <p className="text-xs text-red-500">
                  {
                    errors
                      .province
                      .message
                  }
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="postalCode"
                className="text-sm font-medium text-zinc-900"
              >
                Código postal
              </label>

              <input
                id="postalCode"
                {...register(
                  "postalCode",
                )}
                placeholder="5500"
                className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
              />

              {errors.postalCode && (
                <p className="text-xs text-red-500">
                  {
                    errors
                      .postalCode
                      .message
                  }
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-zinc-900"
              >
                Teléfono
              </label>

              <input
                id="phone"
                type="tel"
                {...register(
                  "phone",
                )}
                placeholder="+54 261..."
                className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
              />

              {errors.phone && (
                <p className="text-xs text-red-500">
                  {
                    errors.phone
                      .message
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}

      <div className="flex justify-end gap-2 border-t border-zinc-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            products.length === 0
          }
          className="inline-flex items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          {isSubmitting
            ? "Generando..."
            : "Generar venta"}
        </button>
      </div>
    </form>
  );
}