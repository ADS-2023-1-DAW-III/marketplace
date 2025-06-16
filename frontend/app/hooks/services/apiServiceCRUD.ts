import type { AxiosResponse } from "axios";
import { useApi } from "./api";

interface ApiService<T> {
  getAll: (params?: Record<string, any>) => Promise<AxiosResponse<T[]>>;
  getById: (id: string | number) => Promise<AxiosResponse<T>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
  update: (id: string | number, data: Partial<T>) => Promise<AxiosResponse<T>>;
  patch: (id: string | number, data: Partial<T>) => Promise<AxiosResponse<T>>;
  delete: (id: string | number) => Promise<AxiosResponse<void>>;
}

const createApiService = <T>(endpoint: string): ApiService<T> => {
  const api = useApi();
  return {
    getAll: (params) => api.get<T[]>(endpoint, { params }),

    getById: (id) => api.get<T>(`${endpoint}/${id}`),

    create: (data) => api.post<T>(endpoint, data),

    update: (id, data) => api.put<T>(`${endpoint}/${id}`, data),

    patch: (id, data) => api.patch<T>(`${endpoint}/${id}`, data),

    delete: (id) => api.delete<void>(`${endpoint}/${id}`),
  };
};

export default createApiService;
