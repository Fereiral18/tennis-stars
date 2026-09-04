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
        border border-[#292E34]
        bg-[#181B1F]
        px-6
        shadow-[0_12px_30px_rgba(0,0,0,0.14)]
      "
    >
      <div
        className="
          flex h-12 w-12 items-center justify-center
          rounded-2xl
          border border-[#40382F]
          bg-[#29231D]
        "
      >
        <Loader2
          className="
            h-5 w-5
            animate-spin
            text-[#D6A46A]
          "
        />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-[#EDEEEB]">
          {message}
        </p>

        <p className="mt-1 text-xs text-[#737B83]">
          Esperá un momento...
        </p>
      </div>
    </div>
  );
}