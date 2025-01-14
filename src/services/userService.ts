import apiClient from "@/services/apiClient";
import { User } from "@/types/user";

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const fetchUser = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: User) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const saveUser = async (data: User) => {
  const response = await apiClient.post("/users/", data);
  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await apiClient.post("/users/reset-password", { email });
  return response.data;
};

export const changePassword = async (id: string, data: any) => {
  const response = await apiClient.put(`/users/change-password/${id}`, {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  });
  return response.data;
};
