import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { IUserAPI, IUserForm, IUserProfile } from "@/types/user";
import { AxiosError } from "axios";

export const useUserApi = () => {
  const apiClient = useAxios();
  const [users, setUsers] = useState<IUserAPI[]>([]);
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
      console.log("users: ", res.data.data);

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

  const updateUser = async (id: string, data: IUserForm) => {
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

  const saveUser = async (data: IUserForm) => {
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

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/users/forgot-password", {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/users/reset-password", { email });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const validateCodeOTP = async (email: string, codeOTP: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/users/validateCodeOTP", {
        email,
        codeOTP,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
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

  const setNewPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post(`/users/setNewPassword`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: string, data: IUserProfile) => {
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
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    setNewPassword,
    validateCodeOTP,
  };
};
