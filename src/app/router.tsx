import {
  Navigate,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import { authService } from "../features/auth/services/auth.service";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ResetPasswordPage } from "../features/auth/pages/ResetPasswordPage";
import { AppLayout } from "../components/layout/AppLayout";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { CategoriesPage } from "../features/categories/pages/CategoriesPages";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { SalesPage } from "../features/sales/pages/SalesPage";



function ProtectedRoute() {
  const isAuthenticated =
    authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function PublicRoute() {
  const isAuthenticated =
    authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="/dashboard"
                replace
              />
            ),
          },

          {
            path: "/dashboard",
            element: <DashboardPage />,
          },

          {
            path: "/categories",
            element: <CategoriesPage />,
          },

          {
            path: "/products",
            element: <ProductsPage />,
          },

          {
            path: "/sales",
            element: <SalesPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: (
      <Navigate
        to="/dashboard"
        replace
      />
    ),
  },
]);