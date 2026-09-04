
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#171513] px-4 py-6 sm:px-6">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Warm glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

      </div>

      {/* =====================================================
          MAIN CARD
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          grid
          w-full
          max-w-6xl
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
          bg-[#f7f4ef]
          shadow-[0_30px_100px_rgba(0,0,0,0.45)]
          lg:grid-cols-[1.05fr_0.95fr]
        "
      >

        {/* =====================================================
            BRAND PANEL
        ====================================================== */}

        <section className="
          relative
          hidden
          min-h-[700px]
          overflow-hidden
          bg-[#201d1a]
          p-10
          text-white
          lg:flex
          lg:flex-col
          lg:justify-between
          xl:p-14
        ">

          {/* Warm gradient */}
          <div className="
            absolute
            inset-0
            bg-gradient-to-br
            from-orange-500/[0.13]
            via-transparent
            to-amber-500/[0.06]
          " />

          {/* Decorative circles */}
          <div className="
            absolute
            -right-32
            top-20
            h-80
            w-80
            rounded-full
            border
            border-orange-400/10
          " />

          <div className="
            absolute
            -right-20
            top-32
            h-56
            w-56
            rounded-full
            border
            border-orange-400/10
          " />

          {/* Decorative shoe-like shape */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              rotate: 8,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="
              absolute
              -right-8
              top-24
              h-52
              w-80
              rotate-[-12deg]
              rounded-[45%_20%_25%_15%]
              bg-gradient-to-br
              from-[#e87932]
              via-[#c95f25]
              to-[#7c351c]
              opacity-90
              shadow-[0_25px_60px_rgba(232,121,50,0.2)]
            "
          >
            {/* Shoe details */}
            <div className="
              absolute
              left-12
              top-12
              h-1
              w-40
              rotate-[-10deg]
              bg-white/20"
            />

            <div className="
              absolute
              left-16
              top-20
              h-1
              w-32
              rotate-[-10deg]
              bg-white/10"
              
            />

            <div className="
              absolute
              bottom-4
              left-10
              right-8
              h-5
              rounded-full
              bg-[#f4eee5]
              opacity-90"
            />
          </motion.div>

          {/* =====================================================
              BRAND
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative z-10"
          >

            <div className="flex items-center gap-3">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-[#f0a35b]
                text-lg
                font-bold
                text-[#201d1a]
                shadow-lg
                shadow-orange-500/20
              ">
                C
              </div>

              <div>
                <span className="
                  block
                  text-lg
                  font-bold
                  tracking-tight
                ">
                  Court Store
                </span>

                <span className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-stone-500
                ">
                  Footwear & Style
                </span>
              </div>

            </div>

          </motion.div>

          {/* =====================================================
              HERO MESSAGE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="relative z-10 max-w-lg"
          >

            <div className="
              mb-6
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-orange-400
            ">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

              Premium Footwear
            </div>

            <h1 className="
              text-5xl
              font-semibold
              leading-[1.02]
              tracking-[-0.03em]
              xl:text-6xl
            ">
              El estilo
              <span className="block text-[#e99a57]">
                empieza por tus pies.
              </span>
            </h1>

            <p className="
              mt-7
              max-w-md
              text-base
              leading-7
              text-stone-400
            ">
              Gestioná tu catálogo, productos, categorías y
              ventas desde un espacio creado para llevar
              Court Store al siguiente nivel.
            </p>

          </motion.div>

          {/* =====================================================
              FEATURES
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.35,
            }}
            className="
              relative
              z-10
              grid
              grid-cols-3
              gap-3
            "
          >

            <div className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.035]
              p-4
              backdrop-blur-sm
            ">
              <p className="text-lg font-semibold">
                01
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Catálogo
              </p>
            </div>

            <div className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.035]
              p-4
              backdrop-blur-sm
            ">
              <p className="text-lg font-semibold">
                02
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Ventas
              </p>
            </div>

            <div className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.035]
              p-4
              backdrop-blur-sm
            ">
              <p className="text-lg font-semibold">
                03
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Analytics
              </p>
            </div>

          </motion.div>

          {/* Footer */}

          <p className="
            relative
            z-10
            text-xs
            text-stone-600
          ">
            © {new Date().getFullYear()} Court Store
          </p>

        </section>

        {/* =====================================================
            LOGIN PANEL
        ====================================================== */}

        <section className="
          flex
          min-h-[700px]
          items-center
          bg-[#f7f4ef]
          px-6
          py-10
          sm:px-10
          lg:px-14
        ">

          <div className="mx-auto w-full max-w-md">

            {/* Mobile branding */}

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="mb-12 lg:hidden"
            >

              <div className="flex items-center gap-3">

                <div className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#e9a05c]
                  font-bold
                  text-[#201d1a]
                ">
                  C
                </div>

                <div>

                  <p className="
                    font-bold
                    text-[#201d1a]
                  ">
                    Court Store
                  </p>

                  <p className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-stone-400
                  ">
                    Footwear & Style
                  </p>

                </div>

              </div>

            </motion.div>

            {/* Header */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="mb-9"
            >

              <div className="
                mb-5
                inline-flex
                items-center
                rounded-full
                border
                border-orange-200
                bg-orange-50
                px-3
                py-1.5
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-orange-700
              ">
                Admin Dashboard
              </div>

              <h2 className="
                text-3xl
                font-semibold
                tracking-tight
                text-[#201d1a]
              ">
                Bienvenido de nuevo
              </h2>

              <p className="
                mt-2
                text-sm
                leading-6
                text-stone-500
              ">
                Ingresá para administrar tu tienda.
              </p>

            </motion.div>

            {/* Login */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
            >
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </motion.div>

            {/* Forgot password */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="mt-5 text-center"
            >

              <Link
                to="/reset-password"
                className="
                  text-sm
                  font-medium
                  text-stone-500
                  transition-colors
                  hover:text-orange-700
                  hover:underline
                  hover:underline-offset-4
                "
              >
                ¿Olvidaste tu contraseña?
              </Link>

            </motion.div>

            {/* Development access */}

            {import.meta.env.DEV && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
                className="
                  mt-8
                  overflow-hidden
                  rounded-2xl
                  border
                  border-stone-200
                  bg-white/60
                "
              >

                <div className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-stone-200
                  px-4
                  py-3
                ">

                  <div className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-orange-100
                    text-sm
                  ">
                    🔐
                  </div>

                  <div>

                    <p className="
                      text-xs
                      font-semibold
                      text-stone-800
                    ">
                      Acceso de desarrollo
                    </p>

                    <p className="
                      text-[11px]
                      text-stone-500
                    ">
                      Solo visible en entorno local
                    </p>

                  </div>

                </div>

                <div className="
                  px-4
                  py-3
                  font-mono
                  text-xs
                ">

                  <p className="text-stone-600">
                    admin@courtstore.com
                  </p>

                  <p className="mt-1 text-stone-400">
                    solicitar contraseña
                  </p>

                </div>

              </motion.div>
            )}

            {/* Footer */}

            <div className="
              mt-10
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-stone-400
            ">
              <span className="
                h-1.5
                w-1.5
                rounded-full
                bg-orange-400"
              />

              Acceso seguro · Court Store

            </div>

          </div>

        </section>

      </motion.div>

    </main>
    )}
