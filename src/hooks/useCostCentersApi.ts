import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { CostCenters } from "@/types/costCenters";
import { AxiosError } from "axios";

export const useCostCentersApi = () => {
  const apiClient = useAxios();
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

  const fetchCostCenters = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/accounting/cost-centers");
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCostCenter = async (id: string) => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/accounting/cost-centers/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCostCenter = async (costCenter: CostCenters) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/accounting/cost-centers", costCenter);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCostCenter = async (
    id: string,
    updatedData: Partial<CostCenters>
  ) => {
    try {
      setLoading(true);

      const response = await apiClient.put(`/accounting/cost-centers/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCostCenter = async (id: string) => {
    try {
      const response = await apiClient.delete(`/accounting/cost-centers/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  return {
    loading,
    error,
    fetchCostCenters,
    fetchCostCenter,
    saveCostCenter,
    updateCostCenter,
    deleteCostCenter,
  };
};
