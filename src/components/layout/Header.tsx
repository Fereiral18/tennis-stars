import {
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../../app/providers/ThemeProvider";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className="
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-[var(--tt-border)]
        bg-[var(--tt-bg-header)]
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* =========================================================
          MOBILE MENU
      ========================================================== */}

      <button
        type="button"
        onClick={onMenuClick}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[var(--tt-border)]
          bg-[var(--tt-bg-muted)]
          text-[var(--tt-text-secondary)]
          transition-all
          duration-200
          hover:border-[var(--tt-border-hover)]
          hover:bg-[var(--tt-bg-hover)]
          hover:text-[var(--tt-text-primary)]
          lg:hidden
        "
        aria-label="Abrir menú"
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>

      {/* =========================================================
          PAGE CONTEXT
      ========================================================== */}

      <div className="hidden lg:block">
        <p className="text-sm font-semibold tracking-tight text-[var(--tt-text-primary-alt2)]">
          Panel de administración
        </p>

        <p className="mt-0.5 text-xs text-[var(--tt-text-muted)]">
          Gestioná tu tienda de zapatillas
        </p>
      </div>

      {/* =========================================================
          RIGHT ACTIONS
      ========================================================== */}

      <div className="ml-auto flex items-center gap-3">
        {/* =======================================================
            THEME TOGGLE
        ======================================================== */}

        <button
          type="button"
          onClick={toggleTheme}
          className="
            group
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-[var(--tt-border)]
            bg-[var(--tt-bg-muted)]
            text-[var(--tt-text-faint)]
            transition-all
            duration-200
            hover:border-[var(--tt-border-hover)]
            hover:bg-[var(--tt-bg-hover)]
            hover:text-[var(--tt-text-primary-alt2)]
          "
          aria-label={
            theme === "dark"
              ? "Cambiar a modo claro"
              : "Cambiar a modo oscuro"
          }
        >
          {theme === "dark" ? (
            <Sun className="h-[17px] w-[17px] transition-transform duration-200 group-hover:scale-105" />
          ) : (
            <Moon className="h-[17px] w-[17px] transition-transform duration-200 group-hover:scale-105" />
          )}
        </button>

        {/* Divider */}

        <div className="hidden h-8 w-px bg-[var(--tt-border)] sm:block" />

        {/* =======================================================
            USER
        ======================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-transparent
            px-2
            py-1.5
            transition-colors
            duration-200
            hover:border-[var(--tt-border)]
            hover:bg-[var(--tt-bg-muted)]
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--tt-avatar-border)]
              bg-[var(--tt-avatar-bg)]
              text-xs
              font-semibold
              text-[var(--tt-avatar-text)]
            "
          >
            A
          </div>

          {/* User information */}

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[var(--tt-text-primary-alt)]">
              Administrador
            </p>

            <p className="mt-0.5 text-[11px] text-[var(--tt-text-muted)]">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}