import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  MapPin,
  Phone,
  User,
} from "lucide-react";

import type { ShippingInfo } from "../types/sale.types";

interface ShippingDialogProps {
  open: boolean;
  shipping: ShippingInfo | null;
  onOpenChange: (
    open: boolean,
  ) => void;
}

export function ShippingDialog({
  open,
  shipping,
  onOpenChange,
}: ShippingDialogProps) {
  if (!shipping) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Información de envío
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-3 rounded-lg bg-zinc-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <User className="h-4 w-4 text-zinc-600" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Destinatario
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-900">
                {shipping.recipientName}
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
                {shipping.address}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {shipping.city},{" "}
                {shipping.province}
              </p>

              <p className="text-sm text-zinc-500">
                CP{" "}
                {shipping.postalCode}
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
                {shipping.phone}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}