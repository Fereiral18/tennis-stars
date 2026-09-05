import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Tags,
  Users,
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
  {
    label: "Clientes",
    path: "/customers",
    icon: Users,
  },
];

export function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();

  function handleLogout(): void {
    authService.logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside
      className="
        flex
        h-full
        w-72
        flex-col
        border-r
        border-[var(--tt-border)]
        bg-[var(--tt-bg-header)]
        text-[var(--tt-text-primary)]
      "
    >
      {/* =========================================================
          BRAND
      ========================================================== */}

      <div
        className="
          flex
          h-[72px]
          items-center
          justify-between
          border-b
          border-[var(--tt-border)]
          px-5
        "
      >
        <div className="flex items-center gap-3">
          {/* Logo */}

          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-[var(--tt-avatar-border)]
              bg-[var(--tt-avatar-bg)]
              text-[var(--tt-avatar-text)]
              shadow-[0_8px_20px_rgba(0,0,0,0.18)]
            "
          >
            <ShoppingBag className="h-5 w-5" />

            <div
              className="
                pointer-events-none
                absolute
                -right-3
                -top-3
                h-8
                w-8
                rounded-full
                bg-[var(--tt-accent)]/10
                blur-lg
              "
            />
          </div>

          {/* Brand */}

          <div>
            <p className="text-sm font-semibold tracking-tight text-[var(--tt-text-primary)]">
              Court Store
            </p>

            <p className="mt-0.5 text-[11px] font-medium text-[var(--tt-text-tertiary)]">
              Sneaker Admin
            </p>
          </div>
        </div>

        {/* Mobile close */}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-[var(--tt-text-tertiary)]
              transition
              hover:bg-[var(--tt-bg-hover)]
              hover:text-[var(--tt-text-primary)]
              lg:hidden
            "
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}

      <nav className="flex-1 space-y-1.5 p-4">
        <p
          className="
            mb-3
            px-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[var(--tt-text-section-label)]
          "
        >
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
                  `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                  `,
                  isActive
                    ? `
                      bg-[var(--tt-avatar-bg)]
                      text-[var(--tt-warm-foreground)]
                      shadow-[0_8px_20px_rgba(0,0,0,0.14)]
                    `
                    : `
                      text-[var(--tt-text-nav-inactive)]
                      hover:bg-[var(--tt-bg-hover-alt)]
                      hover:text-[var(--tt-text-primary-alt2)]
                    `,
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}

                  {isActive && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-6
                        w-0.5
                        -translate-y-1/2
                        rounded-full
                        bg-[var(--tt-accent)]
                      "
                    />
                  )}

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "border border-[var(--tt-accent-border)] bg-[var(--tt-accent-chip-bg)] text-[var(--tt-avatar-text)]"
                          : "bg-transparent text-[var(--tt-text-muted)] group-hover:bg-[var(--tt-bg-hover-soft)] group-hover:text-[var(--tt-text-nav-hover)]"
                      }
                    `}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  <span>{item.label}</span>

                  {/* Active dot */}

                  {isActive && (
                    <span
                      className="
                        ml-auto
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[var(--tt-accent)]
                        shadow-[0_0_8px_rgba(214,164,106,0.45)]
                      "
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* =========================================================
          STORE INFO
      ========================================================== */}

      <div className="px-4">
        <div
          className="
            rounded-2xl
            border
            border-[var(--tt-border)]
            bg-[var(--tt-bg-muted)]
            p-3.5
          "
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--tt-avatar-border)]
                bg-[var(--tt-avatar-bg)]
                text-sm
                font-semibold
                text-[var(--tt-avatar-text)]
              "
            >
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--tt-text-primary-alt)]">
                Administrador
              </p>

              <p className="mt-0.5 truncate text-[11px] text-[var(--tt-text-muted)]">
                admin@courtstore.com
              </p>
            </div>

            {/* Status */}

            <span
              className="
                ml-auto
                h-2
                w-2
                shrink-0
                rounded-full
                bg-[var(--tt-success)]
                shadow-[0_0_8px_rgba(139,167,141,0.35)]
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          LOGOUT
      ========================================================== */}

      <div className="border-t border-[var(--tt-border)] p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-sm
            font-medium
            text-[var(--tt-text-faint)]
            transition-all
            duration-200
            hover:bg-[var(--tt-accent-chip-bg-hover)]
            hover:text-[var(--tt-accent-hover)]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-[var(--tt-bg-hover-alt)]
              transition-colors
              duration-200
              group-hover:bg-[var(--tt-accent-chip-bg)]
            "
          >
            <LogOut className="h-[17px] w-[17px]" />
          </div>

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}