import type {
  AuthResponse,
  LoginCredentials,
  AuthUser,
} from "../types/auth.types";
import { getStorage, removeStorage, setStorage } from "../../../mocks/storage/mockStorage";
import { STORAGE_KEYS } from "../../../lib/constants";

const MOCK_CREDENTIALS = {
  email: "admin@courtstore.com",
  password: "123456",
};

const MOCK_USER: AuthUser = {
  id: "user-001",
  name: "Administrador",
  email: MOCK_CREDENTIALS.email,
};

function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const authService = {
  async login(
    credentials: LoginCredentials,
  ): Promise<AuthResponse> {
    await delay();

    const isValid =
      credentials.email === MOCK_CREDENTIALS.email &&
      credentials.password === MOCK_CREDENTIALS.password;

    if (!isValid) {
      throw new Error("Email o contraseña incorrectos");
    }

    const response: AuthResponse = {
      token: "mock-auth-token",
      user: MOCK_USER,
    };

    setStorage(STORAGE_KEYS.AUTH_TOKEN, response.token);
    setStorage(STORAGE_KEYS.AUTH_USER, response.user);

    return response;
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