import { Package } from "lucide-react";
import { PageHeader } from "../../../components/shared/PageHeader";



export function ProductsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Productos"
        description="Administrá los productos deportivos de tu tienda."
      />

      <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <Package className="mx-auto h-10 w-10 text-zinc-300" />

        <h2 className="mt-4 text-lg font-semibold text-zinc-900">
          CRUD de productos
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          En el siguiente bloque agregaremos el listado,
          creación, edición y eliminación de productos.
        </p>
      </div>
    </div>
  );
}