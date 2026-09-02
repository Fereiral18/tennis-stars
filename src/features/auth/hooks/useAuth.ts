import { useCallback, useState } from "react";

import { authService } from "../services/auth.service";

import type {
  AuthUser,
  LoginCredentials,
} from "../types/auth.types";

interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    credentials: LoginCredentials,
  ) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(
    () => authService.getCurrentUser(),
  );

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null,
  );

  const login = useCallback(
    async (
      credentials: LoginCredentials,
    ): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await authService.login(credentials);

        setUser(response.user);

        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "No fue posible iniciar sesión";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    error,
    login,
    logout,
  };
}