import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  Wallet,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  paymentMethodLabels,
  paymentStatusConfig,
  saleStatusConfig,
} from "../constants/status";

import { formatSaleCode } from "../utils/formatSaleCode";

import type { Sale } from "../types/sale.types";

interface ShippingDialogProps {
  open: boolean;
  sale: Sale | null;
  isCompleting?: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
  onCompleteOrder: (
    sale: Sale,
  ) => void;
}

export function ShippingDialog({
  open,
  sale,
  isCompleting = false,
  onOpenChange,
  onCompleteOrder,
}: ShippingDialogProps) {
  if (!sale) {
    return null;
  }

  const status =
    saleStatusConfig[sale.status];

  const payment =
    paymentStatusConfig[
      sale.paymentStatus
    ];

  const isPaid =
    sale.paymentStatus === "PAID";

  const isCancelled =
    sale.status === "CANCELLED";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isCompleting) {
          onOpenChange(next);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Gestionar pedido
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-4">
            <div>
              <p
                className="font-mono text-xs text-zinc-500"
                title={sale.id}
              >
                {formatSaleCode(sale.id)}
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-900">
                Estado del pedido
              </p>
            </div>

            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          <div className="flex gap-3 rounded-lg bg-zinc-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <User className="h-4 w-4 text-zinc-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-zinc-500">
                Cliente
              </p>

              <p className="mt-1 truncate text-sm font-medium text-zinc-900">
                {sale.customerName}
              </p>

              <p className="mt-1 flex items-center gap-1 truncate text-sm text-zinc-500">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {sale.customerEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg bg-zinc-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <Wallet className="h-4 w-4 text-zinc-600" />
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Medio de pago
                </p>

                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {
                    paymentMethodLabels[
                      sale.paymentMethod
                    ]
                  }
                </p>
              </div>
            </div>

            <span
              className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${payment.className}`}
            >
              {payment.label}
            </span>
          </div>

          <div className="flex gap-3 rounded-lg bg-zinc-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <User className="h-4 w-4 text-zinc-600" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Destinatario
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-900">
                {sale.shipping.recipientName}
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg bg-zinc-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <MapPin className="h-4 w-4 text-zinc-600" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Dirección
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-900">
                {sale.shipping.address}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {sale.shipping.city},{" "}
                {sale.shipping.province}
              </p>

              <p className="text-sm text-zinc-500">
                CP{" "}
                {sale.shipping.postalCode}
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg bg-zinc-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <Phone className="h-4 w-4 text-zinc-600" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Teléfono
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-900">
                {sale.shipping.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t border-zinc-100 pt-4">
          {isPaid ? (
            <div className="flex items-center justify-center gap-2 rounded-md bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Pedido completado y pagado
            </div>
          ) : (
            <button
              type="button"
              disabled={
                isCompleting ||
                isCancelled
              }
              onClick={() =>
                onCompleteOrder(sale)
              }
              className="flex w-full items-center justify-center rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCompleting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {isCancelled
                ? "Pedido cancelado"
                : isCompleting
                  ? "Completando..."
                  : "Completar pedido"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
