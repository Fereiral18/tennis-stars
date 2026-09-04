import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormData } from "../schemas/login.schema";

export function LoginPage() {
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuth();

  async function handleLogin(data: LoginFormData): Promise<void> {
    const success = await login(data);

    if (success) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-8">

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-2"
      >

        {/* =====================================================
            LEFT PANEL
        ====================================================== */}

        <section className="relative hidden min-h-[680px] overflow-hidden bg-zinc-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-transparent" />

          {/* Court lines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

            <div className="absolute left-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-white" />

            <div className="absolute left-[20%] top-1/2 h-[180px] w-[60%] -translate-y-1/2 rounded-full border border-white" />

            <div className="absolute inset-16 rounded-[3rem] border border-white" />
          </div>

          {/* Tennis ball */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="absolute -right-20 top-20 flex h-52 w-52 items-center justify-center rounded-full bg-lime-400 shadow-[0_0_100px_rgba(163,230,53,0.25)]"
          >
            <div className="absolute inset-0 rounded-full border-[3px] border-zinc-900/20" />

            <div className="absolute left-1/2 top-0 h-full w-16 -translate-x-1/2 rotate-45 border-x-2 border-zinc-900/20 rounded-[50%]" />
          </motion.div>

          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="mb-12 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-400 text-xl shadow-lg shadow-lime-400/20">
                🎾
              </div>

              <div>
                <span className="block text-lg font-bold tracking-tight">
                  Court Store
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Tennis Shop
                </span>
              </div>
            </div>

            <div className="max-w-lg">

              <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                Tennis Sports Ecommerce
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                Todo lo que necesitás para
                <span className="block text-lime-400">
                  dominar la cancha.
                </span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-zinc-400">
                Gestioná productos, categorías, ventas y todo tu
                ecommerce desde un único lugar.
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 grid grid-cols-3 gap-3"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
              <p className="text-lg font-semibold">01</p>
              <p className="mt-1 text-xs text-zinc-500">
                Productos
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
              <p className="text-lg font-semibold">02</p>
              <p className="mt-1 text-xs text-zinc-500">
                Ventas
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
              <p className="text-lg font-semibold">03</p>
              <p className="mt-1 text-xs text-zinc-500">
                Dashboard
              </p>
            </div>
          </motion.div>

          <div className="relative z-10 text-xs text-zinc-600">
            © {new Date().getFullYear()} Court Store · Admin Panel
          </div>
        </section>

        {/* =====================================================
            RIGHT PANEL
        ====================================================== */}

        <section className="relative flex min-h-[680px] items-center bg-white px-6 py-10 sm:px-10 lg:px-14">

          <div className="mx-auto w-full max-w-md">

            {/* Mobile logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10 lg:hidden"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-100 text-xl">
                  🎾
                </div>

                <div>
                  <p className="font-bold text-zinc-950">
                    Court Store
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Tennis Shop
                  </p>
                </div>

              </div>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="mb-4 inline-flex items-center rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-700">
                Administración
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
                Bienvenido de nuevo
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Ingresá a tu cuenta para continuar gestionando
                Court Store.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </motion.div>

            {/* Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-center"
            >
              <Link
                to="/reset-password"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 hover:underline hover:underline-offset-4"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </motion.div>

            {/* Test credentials */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
            >
              <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-100">
                  🔐
                </div>

                <div>
                  <p className="text-xs font-semibold text-zinc-800">
                    Acceso de prueba
                  </p>

                  <p className="text-[11px] text-zinc-500">
                    Credenciales para desarrollo
                  </p>
                </div>

              </div>

              <div className="space-y-1 px-4 py-3 font-mono text-xs">
                <p className="text-zinc-600">
                  admin@courtstore.com
                </p>

                <p className="text-zinc-400">
                  solicitar contraseña
                </p>
              </div>
            </motion.div>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-zinc-400">
              Acceso seguro · Court Store Admin
            </p>

          </div>
        </section>
      </motion.div>
    </main>
  );
}
