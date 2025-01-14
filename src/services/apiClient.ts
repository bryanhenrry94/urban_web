import axios from "axios";

// Crea una instancia de axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base de tu API
  timeout: 10000, // Tiempo de espera en ms
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación si está disponible
apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
  const token = "ACCESS_TOKEN";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
