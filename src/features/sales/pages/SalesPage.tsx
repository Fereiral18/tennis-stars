import { ShoppingCart } from "lucide-react";
import { PageHeader } from "../../../components/shared/PageHeader";



export function SalesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Ventas"
        description="Consultá y registrá las ventas de tu tienda."
      />

      <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <ShoppingCart className="mx-auto h-10 w-10 text-zinc-300" />

        <h2 className="mt-4 text-lg font-semibold text-zinc-900">
          Gestión de ventas
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          En el siguiente bloque agregaremos la creación
          y listado real de ventas mediante el Mock API.
        </p>
      </div>
    </div>
  );
}