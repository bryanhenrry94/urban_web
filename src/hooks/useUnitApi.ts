import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Unit, UnitAPI } from "@/types/unit";
import { AxiosError } from "axios";

export const useUnitApi = () => {
  const apiClient = useAxios();
  const [units, setUnits] = useState<UnitAPI[]>([]);
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

  const fetchUnits = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/units");
      setUnits(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnit = async (id: string): Promise<UnitAPI | undefined> => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/units/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveUnit = async (person: Unit) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/units", person);
      setUnits((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUnit = async (id: string, updatedData: Partial<Unit>) => {
    try {
      setLoading(true);

      const response = await apiClient.put(`units/${id}`, updatedData);
      setUnits(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUnit = async (id: string) => {
    try {
      await apiClient.delete(`units/${id}`);
      setUnits((prev) => prev.filter((person) => person._id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return {
    units,
    loading,
    error,
    fetchUnits,
    fetchUnit,
    saveUnit,
    updateUnit,
    deleteUnit,
  };
};
