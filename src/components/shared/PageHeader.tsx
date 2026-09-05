import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* Información de la página */}
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span
            className="
              h-7
              w-1
              shrink-0
              rounded-full
              bg-[var(--tt-accent)]
              shadow-[0_0_10px_rgba(214,164,106,0.18)]
            "
          />

          <h1
            className="
              text-2xl
              font-semibold
              tracking-tight
              text-[var(--tt-text-primary)]
              sm:text-[1.65rem]
            "
          >
            {title}
          </h1>
        </div>

        {description && (
          <p
            className="
              mt-2
              max-w-2xl
              pl-4
              text-sm
              leading-6
              text-[var(--tt-text-tertiary)]
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* Acción */}
      {action && (
        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          {action}
        </div>
      )}
    </div>
  );
}