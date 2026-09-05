import {
  ArrowRight,
  FolderKanban,
  PackagePlus,
  ShoppingCart,
  Sparkles,
  TrendingUp,
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
      <div className="min-h-full bg-[var(--tt-bg-page)] p-4 text-[var(--tt-text-primary)] sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            title="Dashboard"
            description="Resumen general de Court Store"
          />

          <div
            className="
              mt-8
              rounded-3xl
              border
              border-[var(--tt-bg-surface-alt)]
              bg-[var(--tt-bg-surface)]
              p-6
              shadow-[0_20px_50px_rgba(0,0,0,0.20)]
            "
          >
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
    <div className="relative min-h-full overflow-hidden bg-[var(--tt-bg-page)] text-[var(--tt-text-primary)]">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-40
            -top-40
            h-[480px]
            w-[480px]
            rounded-full
            bg-[var(--tt-accent)]/[0.06]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -bottom-48
            -left-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#6F806F]/[0.05]
            blur-[130px]
          "
        />
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
            relative
            overflow-hidden
            rounded-3xl
            border
            border-[var(--tt-bg-surface-alt)]
            bg-[var(--tt-bg-surface)]
            p-6
            shadow-[0_20px_50px_rgba(0,0,0,0.18)]
            sm:p-7
          "
        >
          {/* subtle decorative glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-52
              w-52
              rounded-full
              bg-[var(--tt-accent)]/[0.07]
              blur-[70px]
            "
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#353A40]
                  bg-[var(--tt-bg-hover)]
                  px-3
                  py-1.5
                "
              >
                <Sparkles className="h-3.5 w-3.5 text-[var(--tt-accent)]" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#C1C5C9]
                  "
                >
                 Tennis Stars
                </span>
              </div>

              <PageHeader
                title="Dashboard"
                description="Resumen general de tu tienda"
              />
            </div>

            {/* Store status */}

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-[#304238]
                bg-[#18211C]
                px-3.5
                py-2
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[var(--tt-success)]
                    opacity-60
                  "
                />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--tt-success)]" />
              </span>

              <span className="text-xs font-medium text-[#AFC0B2]">
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
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--tt-accent)]" />

              <h2 className="text-base font-semibold tracking-tight text-[var(--tt-text-primary)]">
                Acciones rápidas
              </h2>
            </div>

            <p className="mt-1 text-sm text-[var(--tt-text-secondary)]">
              Accedé rápidamente a las principales operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* =================================================
                PRODUCTOS
            ================================================== */}

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
                rounded-2xl
                border
                border-[var(--tt-bg-surface-alt)]
                bg-[var(--tt-bg-surface)]
                p-5
                text-left
                shadow-[0_12px_30px_rgba(0,0,0,0.14)]
                transition-all
                duration-300
                hover:border-[var(--tt-border-hover)]
                hover:bg-[#DFE7FD]
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]
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
                    border
                    border-[#40372D]
                    bg-[var(--tt-avatar-bg)]
                    text-[var(--tt-accent)]
                    transition-all
                    duration-300
                    group-hover:border-[var(--tt-accent-border)]
                    group-hover:bg-[var(--tt-accent-chip-bg)]
                  "
                >
                  <PackagePlus className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--tt-text-primary-alt2)]">
                    Productos
                  </p>

                  <p className="mt-1 text-xs text-[var(--tt-text-secondary)]">
                    Administrar productos
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#30353B]
                  bg-[var(--tt-bg-hover)]
                  transition-all
                  duration-300
                  group-hover:border-[var(--tt-border-focus)]
                  group-hover:bg-[var(--tt-border)]
                "
              >
                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[var(--tt-text-secondary)]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:text-[var(--tt-accent)]
                  "
                />
              </div>
            </motion.button>

            {/* =================================================
                CATEGORÍAS
            ================================================== */}

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
                rounded-2xl
                border
                border-[var(--tt-bg-surface-alt)]
                bg-[var(--tt-bg-surface)]
                p-5
                text-left
                shadow-[0_12px_30px_rgba(0,0,0,0.14)]
                transition-all
                duration-300
                hover:border-[var(--tt-border-hover)]
                hover:bg-[#1C2025]
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]
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
                    border
                    border-[#303A32]
                    bg-[#1D251F]
                    text-[#9BAF9D]
                    transition-all
                    duration-300
                    group-hover:border-[#3B4A3D]
                    group-hover:bg-[#243027]
                  "
                >
                  <FolderKanban className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--tt-text-primary-alt2)]">
                    Categorías
                  </p>

                  <p className="mt-1 text-xs text-[var(--tt-text-secondary)]">
                    Administrar categorías
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#30353B]
                  bg-[var(--tt-bg-hover)]
                  transition-all
                  duration-300
                  group-hover:border-[var(--tt-border-focus)]
                  group-hover:bg-[var(--tt-border)]
                "
              >
                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[var(--tt-text-secondary)]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:text-[#9BAF9D]
                  "
                />
              </div>
            </motion.button>

            {/* =================================================
                NUEVA VENTA
            ================================================== */}

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
                rounded-2xl
                border
                border-[#594735]
                bg-[#241F1A]
                p-5
                text-left
                shadow-[0_12px_30px_rgba(0,0,0,0.16)]
                transition-all
                duration-300
                hover:border-[#745C43]
                hover:bg-[#2A241E]
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]
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
                    border
                    border-[#624D38]
                    bg-[#30271F]
                    text-[var(--tt-accent-hover)]
                    transition-all
                    duration-300
                    group-hover:border-[#806344]
                    group-hover:bg-[#392E24]
                  "
                >
                  <ShoppingCart className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#F5F1EA]">
                    Nueva venta
                  </p>

                  <p className="mt-1 text-xs text-[#A79B8E]">
                    Generar una venta
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#584735]
                  bg-[var(--tt-accent-chip-bg)]
                  transition-all
                  duration-300
                  group-hover:border-[#806344]
                  group-hover:bg-[#392F25]
                "
              >
                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[#A99A89]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:text-[var(--tt-accent-hover)]
                  "
                />
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
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-[var(--tt-text-primary)]">
                Inventario
              </h2>

              <p className="mt-1 text-sm text-[var(--tt-text-secondary)]">
                Vista general de los productos registrados.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="
                hidden
                text-xs
                font-semibold
                text-[#A9B0B7]
                transition-colors
                hover:text-[var(--tt-accent)]
                sm:block
              "
            >
              Ver productos →
            </button>
          </div>

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--tt-bg-surface-alt)]
              bg-[var(--tt-bg-surface)]
              shadow-[0_20px_50px_rgba(0,0,0,0.18)]
            "
          >
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