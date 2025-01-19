import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Urbanization } from "@/types/urbanization";
import { AxiosError } from "axios";
import { UrbanizationAPI } from "@/types/urbanization";

export const useUrbanizationApi = () => {
  const apiClient = useAxios();
  const [urbanizations, setUrbanizations] = useState<UrbanizationAPI[]>([]);
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

  const fetchUrbanizations = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/urbanizations");
      setUrbanizations(res.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUrbanization = async (id: string) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/urbanizations/${id}`);
      return res.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUrbanization = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/urbanizations/${id}`);
      setUrbanizations((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUrbanization = async (id: string, data: Urbanization) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/urbanizations/${id}`, data);
      setUrbanizations((prev) =>
        prev.map((c) => (c._id === id ? response.data.data : c))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveUrbanization = async (data: Urbanization) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/urbanizations", data);
      setUrbanizations((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    urbanizations,
    loading,
    error,
    fetchUrbanizations,
    fetchUrbanization,
    deleteUrbanization,
    updateUrbanization,
    saveUrbanization,
  };
};
