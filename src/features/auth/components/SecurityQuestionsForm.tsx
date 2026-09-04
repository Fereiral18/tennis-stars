import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  securityQuestionsSchema,
  type SecurityQuestionsFormData,
} from "../schemas/security-questions.schema";

interface SecurityQuestionsFormProps {
  onSubmit: (
    data: SecurityQuestionsFormData,
  ) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function SecurityQuestionsForm({
  onSubmit,
  isLoading = false,
  error,
}: SecurityQuestionsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityQuestionsFormData>({
    resolver: zodResolver(securityQuestionsSchema),
    defaultValues: {
      companyName: "",
      role: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="companyName"
          className="text-sm font-medium text-zinc-900"
        >
          Nombre de la empresa
        </label>

        <input
          id="companyName"
          type="text"
          autoComplete="off"
          {...register("companyName")}
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
        />

        {errors.companyName && (
          <p className="text-sm text-red-500">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="role"
          className="text-sm font-medium text-zinc-900"
        >
          Rol
        </label>

        <input
          id="role"
          type="text"
          autoComplete="off"
          {...register("role")}
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
        />

        {errors.role && (
          <p className="text-sm text-red-500">
            {errors.role.message}
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex h-11 w-full items-center justify-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        {isLoading ? "Verificando..." : "Continuar"}
      </button>
    </form>
  );
}
