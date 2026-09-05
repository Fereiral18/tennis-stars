# Tennis Stars — Admin Dashboard

Panel de administración para **Court Store**, un ecommerce de zapatillas deportivas (Nike, Adidas, Puma, Under Armour, New Balance, etc.). Permite gestionar categorías, productos (con marca, género y variantes de color/talla), ventas (con estado, pago y envío) y visualizar clientes e indicadores generales del negocio.

Este repositorio contiene únicamente el **frontend**. Consume la API REST expuesta por `Backend-tennis-stars` (NestJS + Prisma + PostgreSQL).

---

## Flujo de la aplicación

1. **Login** (`/login`): autenticación contra `POST /auth/login`, el JWT se guarda en `localStorage` y se adjunta automáticamente a cada request.
2. **Recuperar contraseña** (`/reset-password`): flujo de 2 pasos protegido por 2 preguntas de seguridad estáticas (empresa / rol). Al validarlas se obtiene un token de un solo uso (`purpose: password-reset`, 5 min de expiración) que habilita el cambio de contraseña.
3. **Rutas protegidas**: todo lo que vive bajo `AppLayout` (Sidebar + Header) requiere sesión iniciada; si no hay token válido se redirige a `/login`. Si ya hay sesión, `/login` y `/reset-password` redirigen a `/dashboard`.
4. **Dashboard** (`/dashboard`): métricas generales, accesos rápidos, inventario reciente y últimas ventas.
5. **Categorías** (`/categories`): alta/edición/borrado de categorías de producto.
6. **Productos** (`/products`): alta/edición/borrado de productos, con marca, género, imagen (subida de archivo) y opciones dinámicas de variante (color, talla).
7. **Ventas** (`/sales`): registro de ventas seleccionando producto/variante, gestión de estado (pendiente → confirmada → en preparación → enviada → entregada / cancelada), método y estado de pago, y datos de envío.
8. **Clientes** (`/customers`): vista agregada por cliente (nombre, email, cantidad de pedidos y de productos comprados), calculada en el cliente a partir de `GET /sales`.
9. **Tema claro/oscuro**: alternable desde el botón en el Header; persiste en `localStorage` y se aplica sin parpadeo al recargar.

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Librería UI | React 19 |
| Lenguaje | TypeScript |
| Build tool | Vite 8 (con `@vitejs/plugin-react` y React Compiler vía Babel) |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first config) |
| Enrutamiento | React Router 7 |
| Formularios | React Hook Form + Zod (resolvers de `@hookform/resolvers`) |
| HTTP client | Axios (instancia única con interceptores) |
| Animaciones | Framer Motion / Motion |
| Notificaciones | React Toastify |
| Componentes base | shadcn (Radix primitives vía `@base-ui/react`) |
| Iconografía | Lucide React |
| Linting | ESLint 10 + typescript-eslint |

---

## Arquitectura

**Feature-Sliced / Screaming Architecture**: el código se organiza por dominio de negocio (`features/*`) en lugar de por tipo técnico. Cada feature es autocontenida y expone únicamente lo necesario a través de sus `pages`.

```
src/
├── app/                    # Bootstrap de la aplicación
│   ├── App.tsx             # Composición de providers globales
│   ├── router.tsx          # Definición de rutas + guards
│   └── providers/
│       └── ThemeProvider.tsx
│
├── components/
│   ├── layout/              # Chrome persistente: Sidebar, Header, AppLayout
│   ├── shared/               # Compartidos entre features: DataTable, PageHeader,
│   │                         # LoadingState, EmptyState, ConfirmDialog
│   └── ui/                   # Primitivas shadcn (button, input, select, dropdown-menu)
│
├── features/
│   ├── auth/
│   ├── categories/
│   ├── products/
│   ├── sales/
│   ├── customers/
│   └── dashboard/
│       ├── components/       # UI propia del feature
│       ├── hooks/            # Orquestación de datos (useX)
│       ├── pages/            # Punto de entrada montado por el router
│       ├── schemas/          # Validación Zod (cuando aplica)
│       ├── services/         # Llamadas HTTP (capa de acceso a datos)
│       ├── types/            # Tipos de dominio
│       └── utils/            # Helpers puros (cuando aplica)
│
├── lib/
│   ├── axios.ts              # Instancia de Axios + interceptores
│   ├── constants.ts          # Claves de storage, config de la app
│   ├── storage.ts            # Wrapper tipado de localStorage
│   ├── formatter.ts          # Formateo de moneda/fecha
│   ├── utils.ts               # `cn()` (clsx + tailwind-merge)
│   └── hooks/
│       ├── useFetch.ts       # Hook genérico de lectura (loading/error/refetch)
│       └── useMutation.ts    # Hook genérico de escritura (loading/error/mutate)
│
└── types/                    # Tipos compartidos entre features (BaseEntity, etc.)
```

### Patrones de diseño usados

- **Service layer / Repository-like pattern**: cada feature tiene un `*.service.ts` que encapsula sus llamadas HTTP; el resto de la app nunca llama a Axios directamente.
- **Custom hooks como capa de orquestación**: `useFetch` y `useMutation` son hooks genéricos reutilizados por todos los `useX` de cada feature para exponer `{ data, isLoading, error, mutate/refetch }` de forma consistente, evitando duplicar lógica de estado.
- **Container/Presentational**: las `pages` orquestan datos y estado (hooks, handlers); los `components` de cada feature son mayormente presentacionales y reciben props.
- **Compound/Render-prop table**: `DataTable<T>` recibe `columns` con una función `render(item)` por columna, permitiendo que cada feature defina su propia tabla sin duplicar el layout ni la lógica de scroll/estructura.
- **Guard components / Route protection**: `ProtectedRoute` y `PublicRoute` en `router.tsx` son componentes wrapper (`<Outlet />`) que redirigen según `authService.isAuthenticated()`, en vez de chequear la sesión en cada página.
- **Provider pattern**: `ThemeProvider` expone `{ theme, toggleTheme }` vía Context, con persistencia en `localStorage` y sincronización con la clase `.dark` del `<html>`.
- **Schema-driven forms**: formularios controlados con `react-hook-form` + resolver de `zod`, validando en el cliente con el mismo shape que espera la API.
- **Interceptor pattern (Axios)**: un interceptor de request inyecta el Bearer token automáticamente; un interceptor de response normaliza los errores de la API a un `Error` con mensaje legible.
- **Design tokens vía CSS custom properties**: la paleta de color completa vive en variables CSS (`--tt-*`), no hardcodeada en cada componente, lo que habilita el theming claro/oscuro sin duplicar clases de Tailwind.

---

## Librerías principales (con versión)

```json
"@base-ui/react": "^1.7.0",
"@fontsource-variable/geist": "^5.3.0",
"@hookform/resolvers": "^5.9.1",
"@tailwindcss/vite": "^4.3.3",
"axios": "^1.20.0",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"framer-motion": "^13.2.0",
"lucide-react": "^1.39.0",
"motion": "^13.2.0",
"react": "^19.2.8",
"react-dom": "^19.2.8",
"react-hook-form": "^7.87.0",
"react-router-dom": "^7.18.3",
"react-toastify": "^11.1.0",
"shadcn": "^4.19.1",
"tailwind-merge": "^3.6.0",
"tailwindcss": "^4.3.3",
"tw-animate-css": "^1.4.0",
"zod": "^4.5.4"
```

**Dev dependencies** relevantes: `typescript ~6.0.2`, `vite ^8.2.2`, `eslint ^10.9.0`, `typescript-eslint ^8.67.0`, `@vitejs/plugin-react ^6.1.0`, `babel-plugin-react-compiler ^1.0.0` (React Compiler activado vía Babel para memoización automática).

---

## Paleta de colores (design tokens)

Todos los colores viven como variables CSS en `src/index.css`, definidas dos veces: en `:root` (modo claro) y sobrescritas dentro de `.dark` (modo oscuro). El toggle del Header sólo agrega/quita la clase `dark` del `<html>`.

| Token | Uso | Claro | Oscuro |
|---|---|---|---|
| `--tt-bg-page` | Fondo general de página/tablas | `#F5F5F3` | `#101214` |
| `--tt-bg-surface` | Tarjetas, dropdowns, modales | `#FFFFFF` | `#181B1F` |
| `--tt-border` / `--tt-border-strong` | Bordes por defecto / dashed | `#E3E4E0` / `#D6D8D3` | `#292E34` / `#343A40` |
| `--tt-text-primary` / `--tt-text-secondary` | Jerarquía tipográfica | `#17181A` / `#5A5F63` | `#F5F5F2` / `#8F969D` |
| `--tt-accent` / `--tt-accent-hover` | Marca (ámbar), botones primarios | `#D6A46A` / `#E0B77F` | *(idéntico — color de marca invariante)* |
| `--tt-danger-text` | Acciones/estados destructivos | `#B3434A` | `#C99A9D` |
| `--tt-success` | Indicadores positivos (stock, estado) | `#6E8F70` | `#8BA78D` |

Además existen familias de color específicas para badges de estado de venta (pendiente/confirmada/en preparación/enviada/entregada/cancelada) y para las tarjetas de accesos rápidos del Dashboard (ámbar, verde, morado, teal), todas con su par claro/oscuro definido junto a los tokens anteriores.

---

## Funcionalidades

- Autenticación con JWT (login + logout) y recuperación de contraseña vía preguntas de seguridad.
- CRUD completo de **categorías**.
- CRUD completo de **productos**: nombre, precio, categoría, marca, género, imagen (subida real de archivo, no URL), y opciones dinámicas de variante (color/talla) agregables y eliminables desde el formulario.
- CRUD completo de **ventas**: selección de producto y variante (color/talla/género), método de pago, estado de pago, datos de envío completos, y cambio de estado del pedido con reglas de negocio (p. ej. no se puede cancelar una venta ya **enviada** y **pagada**).
- Vista de **clientes** agregada (pedidos y productos comprados por cliente), calculada en el cliente sobre los datos de `/sales`.
- **Dashboard** con métricas (productos, categorías, ventas, ingresos), accesos rápidos, inventario reciente y ventas recientes.
- **Tema claro/oscuro** persistente en toda la aplicación.
- Manejo centralizado de errores de API con mensajes legibles vía toasts.

---

## Instalación

### Requisitos

- Node.js **20+** (probado con `v24.13.0`)
- npm 10+
- La API de `Backend-tennis-stars` corriendo (local o remota)

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
```

`.env`:

```bash
VITE_API_URL=http://localhost:3000/api
```

```bash
# 3. Levantar el servidor de desarrollo
npm run dev
```

### Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Levanta Vite en modo desarrollo con HMR |
| `npm run build` | Type-check (`tsc -b`) + build de producción |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint` | Corre ESLint sobre todo el proyecto |
