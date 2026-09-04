import {
  CircleDollarSign,
  FolderKanban,
  Package,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStatsProps {
  totalProducts: number;
  totalCategories: number;
  totalSales: number;
  totalRevenue: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function DashboardStats({
  totalProducts,
  totalCategories,
  totalSales,
  totalRevenue,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Productos",
      value: totalProducts,
      description: "Productos registrados",
      icon: Package,
      iconColor: "text-[#D6A46A]",
      iconBackground: "bg-[#29231D]",
      borderColor: "border-[#40372D]",
      hoverBorder: "hover:border-[#574936]",
    },
    {
      title: "Categorías",
      value: totalCategories,
      description: "Categorías disponibles",
      icon: FolderKanban,
      iconColor: "text-[#9BAF9D]",
      iconBackground: "bg-[#1D251F]",
      borderColor: "border-[#303A32]",
      hoverBorder: "hover:border-[#3B4A3D]",
    },
    {
      title: "Ventas",
      value: totalSales,
      description: "Ventas registradas",
      icon: ShoppingCart,
      iconColor: "text-[#B8A0D9]",
      iconBackground: "bg-[#282230]",
      borderColor: "border-[#40364B]",
      hoverBorder: "hover:border-[#554765]",
    },
    {
      title: "Ingresos",
      value: formatCurrency(totalRevenue),
      description: "Ingresos acumulados",
      icon: CircleDollarSign,
      iconColor: "text-[#8FB6A0]",
      iconBackground: "bg-[#1D2822]",
      borderColor: "border-[#304137]",
      hoverBorder: "hover:border-[#405849]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -3,
              transition: { duration: 0.2 },
            }}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              ${stat.borderColor}
              ${stat.hoverBorder}
              bg-[#181B1F]
              p-5
              shadow-[0_12px_30px_rgba(0,0,0,0.14)]
              transition-all
              duration-300
              hover:bg-[#1C2025]
              hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]
            `}
          >
            {/* Glow decorativo */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-white/[0.02]
                blur-2xl
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                {/* Título */}

                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8F969D]">
                  {stat.title}
                </p>

                {/* Valor */}

                <p
                  className="
                    mt-3
                    truncate
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-[#F5F5F2]
                    sm:text-[1.7rem]
                  "
                >
                  {stat.value}
                </p>

                {/* Descripción */}

                <p className="mt-1.5 text-xs text-[#727980]">
                  {stat.description}
                </p>
              </div>

              {/* Icon */}

              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  ${stat.borderColor}
                  ${stat.iconBackground}
                  transition-all
                  duration-300
                  group-hover:scale-105
                `}
              >
                <Icon
                  className={`
                    h-5
                    w-5
                    ${stat.iconColor}
                  `}
                />
              </div>
            </div>

            {/* Indicador inferior */}

            <div className="mt-5 flex items-center gap-2">
              <span
                className={`
                  h-1
                  w-7
                  rounded-full
                  ${stat.iconBackground}
                  transition-all
                  duration-300
                  group-hover:w-10
                `}
              />

              <span className="h-px flex-1 bg-[#272C31]" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}