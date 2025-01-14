import apiClient from "@/services/apiClient";

interface LoginCredentials {
  email: string;
  password: string;
}

export const signin = async (credentials: LoginCredentials) => {
  const response = await apiClient.post("/auth/signin", credentials);
  return response.data;
};

export const signup = async () => {
  const response = await apiClient.post("/auth/signup");
  return response.data;
};
