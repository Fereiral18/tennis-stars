import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Cargando...",
}: LoadingStateProps) {
  return (
    <div
      className="
        flex min-h-64 flex-col items-center justify-center gap-4
        rounded-3xl
        border border-[var(--tt-border)]
        bg-[var(--tt-bg-surface)]
        px-6
        shadow-[0_12px_30px_rgba(0,0,0,0.14)]
      "
    >
      <div
        className="
          flex h-12 w-12 items-center justify-center
          rounded-2xl
          border border-[var(--tt-avatar-border)]
          bg-[var(--tt-avatar-bg)]
        "
      >
        <Loader2
          className="
            h-5 w-5
            animate-spin
            text-[var(--tt-accent)]
          "
        />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-[var(--tt-text-primary-alt)]">
          {message}
        </p>

        <p className="mt-1 text-xs text-[var(--tt-text-muted)]">
          Esperá un momento...
        </p>
      </div>
    </div>
  );
}