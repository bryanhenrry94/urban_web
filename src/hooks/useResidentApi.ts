import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Resident, ResidentAPI } from "@/types/resident";
import { AxiosError } from "axios";

export const useResidentApi = () => {
  const apiClient = useAxios();
  const [residents, setResidents] = useState<ResidentAPI[]>([]);
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

  const fetchResidents = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/residents");
      setResidents(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResident = async (id: string) => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/residents/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveResident = async (person: Resident) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/residents", person);
      setResidents((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateResident = async (id: string, updatedData: Partial<Resident>) => {
    try {
      setLoading(true);

      const response = await apiClient.put(`residents/${id}`, updatedData);
      setResidents(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResident = async (id: string) => {
    try {
      await apiClient.delete(`residents/${id}`);
      setResidents((prev) => prev.filter((person) => person._id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return {
    residents,
    loading,
    error,
    fetchResidents,
    fetchResident,
    saveResident,
    updateResident,
    deleteResident,
  };
};
