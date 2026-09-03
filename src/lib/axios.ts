import axios from "axios";

import { STORAGE_KEYS } from "./constants";
import { getStorage } from "./storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  const token = getStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as
        | { message?: string | string[] }
        | undefined;

      const message = Array.isArray(data?.message)
        ? data.message.join(", ")
        : (data?.message ?? error.message);

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  },
);
