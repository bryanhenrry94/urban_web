import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Company } from "@/types/company";
import { AxiosError } from "axios";
import { APICompany } from "@/types/company";

export const useCompanyApi = () => {
  const apiClient = useAxios();
  const [companies, setCompanies] = useState<APICompany[]>([]);
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

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/companies");
      setCompanies(res.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = async (id: string) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/companies/${id}`);
      return res.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/companies/${id}`);
      setCompanies((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (id: string, data: Company) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/companies/${id}`, data);
      setCompanies((prev) =>
        prev.map((c) => (c._id === id ? response.data.data : c))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCompany = async (data: Company) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/companies", data);
      setCompanies((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    fetchCompany,
    deleteCompany,
    updateCompany,
    saveCompany,
  };
};
