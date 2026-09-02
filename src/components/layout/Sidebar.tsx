import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Package,
  Tags,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { authService } from "@/features/auth/services/auth.service";

interface SidebarProps {
  onClose?: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Categorías",
    path: "/categories",
    icon: Tags,
  },
  {
    label: "Productos",
    path: "/products",
    icon: Package,
  },
  {
    label: "Ventas",
    path: "/sales",
    icon: BarChart3,
  },
];

export function Sidebar({
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();

  function handleLogout(): void {
    authService.logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-zinc-100 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-lg">
            🎾
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-950">
              Court Store
            </p>

            <p className="text-xs text-zinc-500">
              Admin Panel
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
          Menú principal
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                ].join(" ")
              }
            >
              <Icon className="h-4 w-4" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-zinc-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-200 text-sm font-semibold text-zinc-900">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">
              Administrador
            </p>

            <p className="truncate text-xs text-zinc-500">
              admin@courtstore.com
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}