import {
  Bell,
  Menu,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-[#292E34]
        bg-[#141619]
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
          border-[#292E34]
          bg-[#191C20]
          text-[#8F969D]
          transition-all
          duration-200
          hover:border-[#3A4047]
          hover:bg-[#20242A]
          hover:text-[#F5F5F2]
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
        <p className="text-sm font-semibold tracking-tight text-[#F1F2EF]">
          Panel de administración
        </p>

        <p className="mt-0.5 text-xs text-[#737B83]">
          Gestioná tu tienda de zapatillas
        </p>
      </div>

      {/* =========================================================
          RIGHT ACTIONS
      ========================================================== */}

      <div className="ml-auto flex items-center gap-3">
        {/* =======================================================
            NOTIFICATIONS
        ======================================================== */}

        <button
          type="button"
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
            border-[#292E34]
            bg-[#191C20]
            text-[#858D95]
            transition-all
            duration-200
            hover:border-[#3A4047]
            hover:bg-[#20242A]
            hover:text-[#F1F2EF]
          "
          aria-label="Notificaciones"
        >
          <Bell className="h-[17px] w-[17px] transition-transform duration-200 group-hover:scale-105" />

          {/* Notification indicator */}

          <span
            className="
              absolute
              right-2
              top-2
              h-1.5
              w-1.5
              rounded-full
              bg-[#D6A46A]
              shadow-[0_0_8px_rgba(214,164,106,0.45)]
            "
          />
        </button>

        {/* Divider */}

        <div className="hidden h-8 w-px bg-[#292E34] sm:block" />

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
            hover:border-[#292E34]
            hover:bg-[#191C20]
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
              border-[#40382F]
              bg-[#29231D]
              text-xs
              font-semibold
              text-[#D6A46A]
            "
          >
            A
          </div>

          {/* User information */}

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[#EDEEEB]">
              Administrador
            </p>

            <p className="mt-0.5 text-[11px] text-[#737B83]">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}