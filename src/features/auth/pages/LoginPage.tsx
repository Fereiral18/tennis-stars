import { useNavigate } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

import type { LoginFormData } from "../schemas/login.schema";

export function LoginPage() {
  const navigate = useNavigate();

  const {
    login,
    isLoading,
    error,
  } = useAuth();

  async function handleLogin(
    data: LoginFormData,
  ): Promise<void> {
    const success = await login(data);

    if (success) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        <section className="hidden min-h-[620px] bg-zinc-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-xl text-zinc-950">
                🎾
              </div>

              <span className="text-lg font-semibold">
                Court Store
              </span>
            </div>

            <div className="max-w-md">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
                Tennis Sports Ecommerce
              </p>

              <h1 className="text-4xl font-semibold leading-tight">
                Todo lo que necesitás para dominar la cancha.
              </h1>

              <p className="mt-6 text-base leading-7 text-zinc-400">
                Administrá productos, categorías y ventas
                desde un único lugar.
              </p>
            </div>
          </div>

          <div className="text-sm text-zinc-500">
            Court Store · Admin Panel
          </div>
        </section>

        <section className="flex min-h-[620px] items-center p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-100 text-xl lg:hidden">
                🎾
              </div>

              <h2 className="text-2xl font-semibold text-zinc-950">
                Bienvenido
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Ingresá a tu panel de administración.
              </p>
            </div>

            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />

            <div className="mt-6 rounded-lg bg-zinc-50 p-4 text-xs text-zinc-500">
              <p className="font-medium text-zinc-700">
                Credenciales de prueba
              </p>

              <p className="mt-1">
                admin@courtstore.com
              </p>

              <p>123456</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}