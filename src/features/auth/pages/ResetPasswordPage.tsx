import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SecurityQuestionsForm } from "../components/SecurityQuestionsForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { authService } from "../services/auth.service";

import type { SecurityQuestionsFormData } from "../schemas/security-questions.schema";
import type { ResetPasswordFormData } from "../schemas/reset-password.schema";

type Step = "questions" | "password";

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("questions");
  const [verificationToken, setVerificationToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleVerifyAnswers(
    data: SecurityQuestionsFormData,
  ): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const { verificationToken: token } =
        await authService.verifySecurityAnswers(data);

      setVerificationToken(token);
      setStep("password");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No fue posible verificar las respuestas";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(
    data: ResetPasswordFormData,
  ): Promise<void> {
    if (!verificationToken) {
      setStep("questions");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await authService.resetPassword({
        verificationToken,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      toast.success(
        "Contraseña actualizada correctamente",
      );

      navigate("/login", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No fue posible cambiar la contraseña";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-100 text-xl">
            🎾
          </div>

          <h2 className="text-2xl font-semibold text-zinc-950">
            Cambiar contraseña
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {step === "questions"
              ? "Respondé las preguntas de seguridad para continuar."
              : "Ingresá tu nueva contraseña para el panel de administración."}
          </p>
        </div>

        {step === "questions" ? (
          <SecurityQuestionsForm
            onSubmit={handleVerifyAnswers}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <ResetPasswordForm
            onSubmit={handleResetPassword}
            isLoading={isLoading}
            error={error}
          />
        )}

        <p className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          >
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
