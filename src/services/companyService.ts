import apiClient from "@/services/apiClient";
import { Company } from "@/types/company";

export const fetchCompanies = async () => {
  const response = await apiClient.get("/companies");
  return response.data;
};

export const fetchCompany = async (id: string) => {
  const response = await apiClient.get(`/companies/${id}`);
  return response.data;
};

export const deleteCompany = async (id: string) => {
  const response = await apiClient.delete(`/companies/${id}`);
  return response.data;
};

export const updateCompany = async (id: string, data: Company) => {
  const response = await apiClient.put(`/companies/${id}`, data);
  return response.data;
};

export const saveCompany = async (data: Company) => {
  const response = await apiClient.post("/companies/", data);
  return response.data;
};
