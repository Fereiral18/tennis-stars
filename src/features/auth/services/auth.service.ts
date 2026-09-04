import { api } from "@/lib/axios";
import { getStorage, removeStorage, setStorage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  ResetPasswordCredentials,
  SecurityAnswers,
  VerificationTokenResponse,
} from "../types/auth.types";

export const authService = {
  async login(
    credentials: LoginCredentials,
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/auth/login",
      credentials,
    );

    setStorage(STORAGE_KEYS.AUTH_TOKEN, data.token);
    setStorage(STORAGE_KEYS.AUTH_USER, data.user);

    return data;
  },

  async verifySecurityAnswers(
    answers: SecurityAnswers,
  ): Promise<VerificationTokenResponse> {
    const { data } = await api.post<VerificationTokenResponse>(
      "/auth/verify-security-answers",
      answers,
    );

    return data;
  },

  async resetPassword(
    credentials: ResetPasswordCredentials,
  ): Promise<void> {
    await api.patch("/auth/reset-password", credentials);
  },

  logout(): void {
    removeStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeStorage(STORAGE_KEYS.AUTH_USER);
  },

  isAuthenticated(): boolean {
    const token = getStorage<string | null>(
      STORAGE_KEYS.AUTH_TOKEN,
      null,
    );

    return Boolean(token);
  },

  getCurrentUser(): AuthUser | null {
    return getStorage<AuthUser | null>(
      STORAGE_KEYS.AUTH_USER,
      null,
    );
  },
};
