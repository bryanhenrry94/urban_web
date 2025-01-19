import apiClient from "@/services/apiClient";
import { SignupValues, LoginCredentials } from "@/types/auth";

export const signin = async (credentials: LoginCredentials) => {
  const response = await apiClient.post("/auth/signin", credentials);
  return response.data;
};

export const signup = async (data: SignupValues) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};
