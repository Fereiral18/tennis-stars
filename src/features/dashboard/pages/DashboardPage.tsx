import {
  ArrowRight,
  FolderKanban,
  PackagePlus,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { DashboardStats } from "../components/DashboardStats";
import { InventoryTable } from "../components/InventoryTable";
import { RecentSales } from "../components/RecentSales";
import { useDashboard } from "../hooks/useDashboard";

import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

export function DashboardPage() {
  const navigate = useNavigate();

  const {
    products,
    recentSales,
    metrics,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Resumen general de Court Store"
        />

        <EmptyState
          title="No fue posible cargar el dashboard"
          description="Ocurrió un error al consultar los datos."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Resumen general de Court Store"
      />

      <DashboardStats
        totalProducts={metrics.totalProducts}
        totalCategories={metrics.totalCategories}
        totalSales={metrics.totalSales}
        totalRevenue={metrics.totalRevenue}
      />

      {/* Acciones rápidas */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-zinc-950">
            Acciones rápidas
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Accedé rápidamente a las principales operaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="
              group
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-zinc-200
              bg-white
              p-5
              text-left
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-zinc-300
              hover:shadow-md
            "
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100">
                <PackagePlus className="h-5 w-5 text-zinc-700" />
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Productos
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Administrar productos
                </p>
              </div>
            </div>

            <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="
              group
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-zinc-200
              bg-white
              p-5
              text-left
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-zinc-300
              hover:shadow-md
            "
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100">
                <FolderKanban className="h-5 w-5 text-zinc-700" />
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Categorías
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Administrar categorías
                </p>
              </div>
            </div>

            <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/sales")}
            className="
              group
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-zinc-200
              bg-white
              p-5
              text-left
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-zinc-300
              hover:shadow-md
            "
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100">
                <ShoppingCart className="h-5 w-5 text-zinc-700" />
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Nueva venta
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Generar una venta
                </p>
              </div>
            </div>

            <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Inventario */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-zinc-950">
            Productos
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Vista general de los productos registrados en Court Store.
          </p>
        </div>

        <InventoryTable products={products} />
      </section>

      {/* Ventas recientes */}
      <section>
        <RecentSales
          sales={recentSales}
          onViewAll={() => navigate("/sales")}
        />
      </section>
    </div>
  );
}