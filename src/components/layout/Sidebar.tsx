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
        border-[#292E34]
        bg-[#141619]
        text-[#F5F5F2]
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
          border-[#292E34]
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
              border-[#554533]
              bg-[#29231D]
              text-[#D6A46A]
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
                bg-[#D6A46A]/10
                blur-lg
              "
            />
          </div>

          {/* Brand */}

          <div>
            <p className="text-sm font-semibold tracking-tight text-[#F5F5F2]">
              Court Store
            </p>

            <p className="mt-0.5 text-[11px] font-medium text-[#7F878F]">
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
              text-[#7F878F]
              transition
              hover:bg-[#20242A]
              hover:text-[#F5F5F2]
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
            text-[#666E76]
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
                      bg-[#29231D]
                      text-[#F3E5D4]
                      shadow-[0_8px_20px_rgba(0,0,0,0.14)]
                    `
                    : `
                      text-[#8D959C]
                      hover:bg-[#1D2126]
                      hover:text-[#F1F2EF]
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
                        bg-[#D6A46A]
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
                          ? "border border-[#574936] bg-[#302820] text-[#D6A46A]"
                          : "bg-transparent text-[#737B83] group-hover:bg-[#252A30] group-hover:text-[#C1C6CA]"
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
                        bg-[#D6A46A]
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
            border-[#292E34]
            bg-[#191C20]
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
                border-[#3F382F]
                bg-[#29231D]
                text-sm
                font-semibold
                text-[#D6A46A]
              "
            >
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#EDEEEB]">
                Administrador
              </p>

              <p className="mt-0.5 truncate text-[11px] text-[#737B83]">
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
                bg-[#8BA78D]
                shadow-[0_0_8px_rgba(139,167,141,0.35)]
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          LOGOUT
      ========================================================== */}

      <div className="border-t border-[#292E34] p-4">
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
            text-[#858D95]
            transition-all
            duration-200
            hover:bg-[#211D1B]
            hover:text-[#D8B18A]
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
              bg-[#1D2126]
              transition-colors
              duration-200
              group-hover:bg-[#302820]
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