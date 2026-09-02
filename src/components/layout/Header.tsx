import {
  Bell,
  Menu,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm font-medium text-zinc-900">
          Panel de administración
        </p>

        <p className="text-xs text-zinc-500">
          Gestioná tu tienda deportiva
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-lime-400" />
        </button>

        <div className="hidden h-8 w-px bg-zinc-200 sm:block" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-200 text-xs font-semibold text-zinc-900">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-medium text-zinc-900">
              Administrador
            </p>

            <p className="text-[11px] text-zinc-500">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}