import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { ErrorAlert } from "~/components/ui/AlertMessages";

export function useApi() {
  const { token, setToken } = useContext(AuthContext);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        if (config.headers) {
          (config.headers as Record<string, string>)[
            "Authorization"
          ] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        ErrorAlert("Sessão expirada. Por favor, faça login novamente.");
        setToken(null);
      }

      return Promise.reject(error);
    }
  );

  return api;
}
