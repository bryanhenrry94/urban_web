import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { ICostCenters } from "@/types";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

export const useCostCentersApi = () => {
  const apiClient = useAxios();
  const [loading, setLoading] = useState<boolean>(false);

  const handleError = async (error: unknown) => {
    let message = "An unknown error occurred";

    if (error instanceof AxiosError) {
      message = error.response?.data.message || "Unknown Axios error";
    } else if (error instanceof Error) {
      message = error.message;
    }

    await Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonColor: "#14b8a6",
    });
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

  const saveCostCenter = async (costCenter: ICostCenters) => {
    try {
      setLoading(true);

      const response = await apiClient.post(
        "/accounting/cost-centers",
        costCenter
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCostCenter = async (
    id: string,
    updatedData: Partial<ICostCenters>
  ) => {
    try {
      setLoading(true);

      const response = await apiClient.put(
        `/accounting/cost-centers/${id}`,
        updatedData
      );
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
    fetchCostCenters,
    fetchCostCenter,
    saveCostCenter,
    updateCostCenter,
    deleteCostCenter,
  };
};
