import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { IJournalEntriesForm } from "@/types";

export const useJournalEntriesApi = () => {
  const apiClient = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorAxios, setErrorAxios] = useState<string>("");

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      setErrorAxios(error.response?.data.message || "Unknown Axios error");
    } else if (error instanceof Error) {
      setErrorAxios(error.message);
    } else {
      setErrorAxios("An unknown error occurred");
    }
  };

  const fetchJournalEntries = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/accounting/journal-entries");
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFournalEntry = async (id: string) => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/accounting/journal-entries/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveJournalEntry = async (costCenter: IJournalEntriesForm) => {
    try {
      setLoading(true);

      const response = await apiClient.post(
        "/accounting/journal-entries",
        costCenter
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateJournalEntry = async (
    id: string,
    updatedData: Partial<IJournalEntriesForm>
  ) => {
    try {
      setLoading(true);

      const response = await apiClient.put(
        `/accounting/journal-entries/${id}`,
        updatedData
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJournalEntry = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/accounting/journal-entries/${id}`
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  };

  return {
    loading,
    errorAxios,
    fetchJournalEntries,
    fetchFournalEntry,
    saveJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
  };
};
