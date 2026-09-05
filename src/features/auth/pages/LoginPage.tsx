import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
    <main className="min-h-screen bg-[var(--tt-bg-page)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            grid
            w-full
            overflow-hidden
            rounded-[2rem]
            border
            border-[#DED7CE]
            bg-[#FCFAF7]
            shadow-[0_25px_80px_rgba(58,48,38,0.12)]
            lg:min-h-[720px]
            lg:grid-cols-[1.05fr_0.95fr]
          "
        >
          {/* =====================================================
              BRAND / VISUAL PANEL
          ====================================================== */}

          <section className="relative hidden overflow-hidden bg-[#403B35] lg:flex">
            {/* Background image */}
            <div
              className="
                absolute
                inset-0
                bg-cover
                bg-center
              "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85')",
              }}
            />

            {/* Warm overlay */}
            <div className="absolute inset-0 bg-[#2F2A25]/65" />

            {/* Soft light */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D9B99B]/20 blur-[100px]" />

            <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#9BA58A]/20 blur-[100px]" />

            {/* Content */}
            <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Link
                  to="/"
                  className="group inline-flex items-center gap-3"
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#F5EBDD]
                      text-lg
                      font-black
                      tracking-tight
                      text-[#403B35]
                      shadow-lg
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    C
                  </div>

                  <div>
                    <span className="block text-lg font-bold tracking-tight text-white">
                      Tennis Stars
                    </span>

                    <span className="block text-[9px] font-medium uppercase tracking-[0.28em] text-white/55">
                      Footwear & Style
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-lg"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#D9B99B]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    Estilo que te representa
                  </span>
                </div>

                <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-white xl:text-6xl">
                  Caminá con
                  <span className="block text-[#E1C5AA]">
                    tu propio estilo.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/65 xl:text-base">
                  Descubrí una selección de calzado pensada para quienes
                  buscan comodidad, personalidad y estilo en cada paso.
                </p>

                {/* Features */}
                <div className="mt-9 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                      <Check className="h-4 w-4 text-[#D9B99B]" />
                    </div>

                    <p className="text-sm font-medium text-white">
                      Selección cuidada
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/45">
                      Modelos elegidos para vos.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles className="h-4 w-4 text-[#D9B99B]" />
                    </div>

                    <p className="text-sm font-medium text-white">
                      Estilo auténtico
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/45">
                      Encontrá tu próximo favorito.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-between"
              >
                <p className="text-xs text-white/35">
                  © {new Date().getFullYear()} Court Store
                </p>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Compra segura
                </div>
              </motion.div>
            </div>
          </section>

          {/* =====================================================
              LOGIN PANEL
          ====================================================== */}

          <section className="relative flex items-center bg-[#FCFAF7] px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E6D7C8]/50 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#DCE1D5]/60 blur-[90px]" />

            <div className="relative z-10 mx-auto w-full max-w-md">
              {/* =================================================
                  MOBILE BRAND
              ================================================== */}

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-12 lg:hidden"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#403B35] text-base font-black text-[#F5EBDD] shadow-md">
                    C
                  </div>

                  <div>
                    <p className="font-bold tracking-tight text-[#403B35]">
                      Court Store
                    </p>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#403B35]/45">
                      Footwear & Style
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* =================================================
                  HEADER
              ================================================== */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E4DDD4] bg-[#F4EFE9] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#87947B]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6E665E]">
                    Acceso privado
                  </span>
                </div>

                <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[#403B35] sm:text-4xl">
                  Bienvenido de nuevo.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#403B35]/55">
                  Ingresá a tu cuenta para continuar gestionando
                  Tennis Store.
                </p>
              </motion.div>

              {/* =================================================
                  FORM
              ================================================== */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="mt-9"
              >
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  error={error}
                />
              </motion.div>

              {/* =================================================
                  FORGOT PASSWORD
              ================================================== */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
                className="mt-5 text-center"
              >
                <Link
                  to="/reset-password"
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-sm
                    font-medium
                    text-[#6E665E]
                    transition-colors
                    duration-200
                    hover:text-[#403B35]
                  "
                >
                  ¿Olvidaste tu contraseña?

                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              {/* =================================================
                  DEVELOPMENT ACCESS
              ================================================== */}

              {import.meta.env.DEV && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                  className="mt-8 overflow-hidden rounded-2xl border border-[#E4DDD4] bg-[#F5F1EB]/70"
                >
                  <div className="flex items-center gap-3 border-b border-[#E4DDD4] px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E9E2D9]">
                      <LockKeyhole className="h-4 w-4 text-[#6E665E]" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#403B35]">
                        Acceso de desarrollo
                      </p>

                      <p className="text-[11px] text-[#403B35]/40">
                        Solo visible en entorno local
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3 font-mono text-xs">
                    <p className="text-[#403B35]/70">
                      admin@courtstore.com
                    </p>

                    <p className="mt-1 text-[#403B35]/35">
                      solicitar contraseña
                    </p>
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  SECURITY FOOTER
              ================================================== */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.45,
                }}
                className="mt-10 flex items-center justify-center gap-2 text-xs text-[#403B35]/35"
              >
                <ShieldCheck className="h-3.5 w-3.5" />

                <span>
                  Tus datos están protegidos
                </span>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}