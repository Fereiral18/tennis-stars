import {
  ArrowRight,
  FolderKanban,
  PackagePlus,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
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
      <div className="min-h-full bg-[#F5F1EB] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            title="Dashboard"
            description="Resumen general de Court Store"
          />

          <div className="mt-8 rounded-[1.5rem] border border-[#E4DDD4] bg-[#FCFAF7] p-6 shadow-[0_10px_35px_rgba(58,48,38,0.06)]">
            <EmptyState
              title="No fue posible cargar el dashboard"
              description="Ocurrió un error al consultar los datos."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-[#F5F1EB]">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#E6D7C8]/45 blur-[100px]" />

        <div className="absolute -bottom-48 -left-40 h-[480px] w-[480px] rounded-full bg-[#DCE1D5]/45 blur-[120px]" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* =======================================================
            HEADER
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            rounded-[1.75rem]
            border
            border-[#E4DDD4]
            bg-[#FCFAF7]
            p-6
            shadow-[0_10px_35px_rgba(58,48,38,0.05)]
            sm:p-7
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E4DDD4] bg-[#F4EFE9] px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#9A8068]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E665E]">
                  Court Store
                </span>
              </div>

              <PageHeader
                title="Dashboard"
                description="Resumen general de Court Store"
              />
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-[#DDE2D7] bg-[#F1F4ED] px-3 py-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#87947B]" />

              <span className="text-xs font-medium text-[#68715F]">
                Tienda activa
              </span>
            </div>
          </div>
        </motion.div>

        {/* =======================================================
            STATS
        ======================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <DashboardStats
            totalProducts={metrics.totalProducts}
            totalCategories={metrics.totalCategories}
            totalSales={metrics.totalSales}
            totalRevenue={metrics.totalRevenue}
          />
        </motion.section>

        {/* =======================================================
            QUICK ACTIONS
        ======================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mb-4">
            <h2 className="text-base font-semibold tracking-tight text-[#403B35]">
              Acciones rápidas
            </h2>

            <p className="mt-1 text-sm text-[#403B35]/50">
              Accedé rápidamente a las principales operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Productos */}
            <motion.button
              type="button"
              onClick={() => navigate("/products")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="
                group
                flex
                items-center
                justify-between
                rounded-[1.25rem]
                border
                border-[#E4DDD4]
                bg-[#FCFAF7]
                p-5
                text-left
                shadow-[0_8px_25px_rgba(58,48,38,0.05)]
                transition-shadow
                duration-300
                hover:shadow-[0_15px_35px_rgba(58,48,38,0.09)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#EEE8E0]
                    text-[#6E6256]
                    transition-colors
                    duration-300
                    group-hover:bg-[#E5D8CB]
                  "
                >
                  <PackagePlus className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#403B35]">
                    Productos
                  </p>

                  <p className="mt-1 text-xs text-[#403B35]/45">
                    Administrar productos
                  </p>
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DDD4] bg-[#F8F5F1]">
                <ArrowRight className="h-4 w-4 text-[#8B8177] transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </motion.button>

            {/* Categorías */}
            <motion.button
              type="button"
              onClick={() => navigate("/categories")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="
                group
                flex
                items-center
                justify-between
                rounded-[1.25rem]
                border
                border-[#E4DDD4]
                bg-[#FCFAF7]
                p-5
                text-left
                shadow-[0_8px_25px_rgba(58,48,38,0.05)]
                transition-shadow
                duration-300
                hover:shadow-[0_15px_35px_rgba(58,48,38,0.09)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#E7EBE1]
                    text-[#66705D]
                    transition-colors
                    duration-300
                    group-hover:bg-[#DDE4D6]
                  "
                >
                  <FolderKanban className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#403B35]">
                    Categorías
                  </p>

                  <p className="mt-1 text-xs text-[#403B35]/45">
                    Administrar categorías
                  </p>
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DDD4] bg-[#F8F5F1]">
                <ArrowRight className="h-4 w-4 text-[#8B8177] transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </motion.button>

            {/* Nueva venta */}
            <motion.button
              type="button"
              onClick={() => navigate("/sales")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="
                group
                flex
                items-center
                justify-between
                rounded-[1.25rem]
                border
                border-[#DCCEC0]
                bg-[#F8F1EA]
                p-5
                text-left
                shadow-[0_8px_25px_rgba(58,48,38,0.05)]
                transition-shadow
                duration-300
                hover:shadow-[0_15px_35px_rgba(58,48,38,0.09)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#E8D8C8]
                    text-[#725D4A]
                    transition-colors
                    duration-300
                    group-hover:bg-[#DFCCBA]
                  "
                >
                  <ShoppingCart className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#403B35]">
                    Nueva venta
                  </p>

                  <p className="mt-1 text-xs text-[#403B35]/45">
                    Generar una venta
                  </p>
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDCFC1] bg-[#FCF8F4]">
                <ArrowRight className="h-4 w-4 text-[#8B8177] transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          </div>
        </motion.section>

        {/* =======================================================
            INVENTORY
        ======================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mb-4">
            <h2 className="text-base font-semibold tracking-tight text-[#403B35]">
              Inventario
            </h2>

            <p className="mt-1 text-sm text-[#403B35]/50">
              Vista general de los productos registrados en Court Store.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[#E4DDD4] bg-[#FCFAF7] shadow-[0_10px_35px_rgba(58,48,38,0.05)]">
            <InventoryTable products={products} />
          </div>
        </motion.section>

        {/* =======================================================
            RECENT SALES
        ======================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.29,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <RecentSales
            sales={recentSales}
            onViewAll={() => navigate("/sales")}
          />
        </motion.section>
      </div>
    </div>
  );
}