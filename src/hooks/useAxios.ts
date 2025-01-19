import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { useSession } from "next-auth/react";

export const useAxios = () => {
  const { data: session } = useSession() as any;

  // Crear una instancia de Axios
  const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base de la API
    timeout: 10000, // Tiempo de espera en ms
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": session?.user?.tenantId,
    },
  });

  // Interceptor para agregar el token al header Authorization
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = session?.accessToken; // Accede al token de la sesión
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => {
      // Manejo de errores en la configuración
      return Promise.reject(error);
    }
  );

  return apiClient;
};
