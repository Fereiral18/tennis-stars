import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Cargando...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white">
      <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />

      <p className="text-sm text-zinc-500">
        {message}
      </p>
    </div>
  );
}