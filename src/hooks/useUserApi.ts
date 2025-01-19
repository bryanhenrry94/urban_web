import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { APIUser, User, UserProfile } from "@/types/user";
import { AxiosError } from "axios";

export const useUserApi = () => {
  const apiClient = useAxios();
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      setError(error.response?.data.message || "Unknown Axios error");
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unknown error occurred");
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/users/${id}`);
      return res.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, data: User) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/users/${id}`, data);
      setUsers((prev) =>
        prev.map((c) => (c._id === id ? response.data.data : c))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (data: User) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/users", data);
      setUsers((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    const response = await apiClient.post("/users/reset-password", { email });
    return response.data;
  };

  const changePassword = async (id: string, data: any) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/users/change-password/${id}`, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: string, data: UserProfile) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUser,
    deleteUser,
    updateUser,
    saveUser,
    resetPassword,
    changePassword,
    updateProfile,
  };
};
