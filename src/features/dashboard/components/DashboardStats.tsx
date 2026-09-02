import {
  CircleDollarSign,
  FolderKanban,
  Package,
  ShoppingCart,
} from "lucide-react";

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
    },
    {
      title: "Categorías",
      value: totalCategories,
      description: "Categorías disponibles",
      icon: FolderKanban,
    },
    {
      title: "Ventas",
      value: totalSales,
      description: "Ventas registradas",
      icon: ShoppingCart,
    },
    {
      title: "Ingresos",
      value: formatCurrency(totalRevenue),
      description: "Ingresos acumulados",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              p-5
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-2 truncate text-2xl font-semibold tracking-tight text-zinc-950">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {stat.description}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                <Icon className="h-5 w-5 text-zinc-700" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}