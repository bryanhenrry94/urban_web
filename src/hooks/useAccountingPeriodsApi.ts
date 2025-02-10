import { useAxios } from "@/hooks/useAxios";
import { IAccountingPeriod } from "@/types";

export const useAccountingPeriodsApi = () => {
  const apiClient = useAxios();

  const createPeriod = async (period: IAccountingPeriod) => {
    try {
      const response = await apiClient.post(
        "/accounting/accounting-periods",
        period
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating period:", error);
    }
  };

  const updatePeriod = async (id: string, period: IAccountingPeriod) => {
    try {
      const response = await apiClient.put(
        `/accounting/accounting-periods/${id}`,
        period
      );

      if (!response.data) {
        throw new Error("Network response was not ok   ");
      }

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPeriods = async () => {
    try {
      const response = await apiClient.get("/accounting/accounting-periods");

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating period:", error);
    }
  };

  const getPeriod = async (id: string) => {
    try {
      const response = await apiClient.get(
        `/accounting/accounting-periods/${id}`
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating period:", error);
    }
  };

  const deletePeriod = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/accounting/accounting-periods/${id}`
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      return response.data.data;
    } catch (error) {
      console.error("Error creating period:", error);
    }
  };

  return {
    createPeriod,
    updatePeriod,
    getPeriods,
    getPeriod,
    deletePeriod,
  };
};
