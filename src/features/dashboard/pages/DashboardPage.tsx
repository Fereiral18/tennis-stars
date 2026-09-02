import {
  ArrowUpRight,
  Package,
  ShoppingCart,
  Tags,
} from "lucide-react";
import { PageHeader } from "../../../components/shared/PageHeader";



const stats = [
  {
    title: "Productos",
    value: "48",
    description: "Productos registrados",
    icon: Package,
  },
  {
    title: "Categorías",
    value: "8",
    description: "Categorías activas",
    icon: Tags,
  },
  {
    title: "Ventas",
    value: "125",
    description: "Ventas registradas",
    icon: ShoppingCart,
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Resumen general de tu tienda de tenis."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
                  <Icon className="h-5 w-5 text-zinc-700" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </div>

              <div className="mt-5">
                <p className="text-sm text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-semibold text-zinc-950">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-950">
          Inventario de productos
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Próximamente conectado al mock API de productos.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-zinc-200 p-10 text-center">
          <Package className="mx-auto h-8 w-8 text-zinc-300" />

          <p className="mt-3 text-sm font-medium text-zinc-700">
            No hay datos cargados todavía
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-950">
          Ventas recientes
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Próximamente conectado al mock API de ventas.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-zinc-200 p-10 text-center">
          <ShoppingCart className="mx-auto h-8 w-8 text-zinc-300" />

          <p className="mt-3 text-sm font-medium text-zinc-700">
            No hay ventas cargadas todavía
          </p>
        </div>
      </section>
    </div>
  );
}