import apiClient from "@/services/apiClient";
import { Person } from "@/types/person";

export const fetchPeople = async () => {
  const response = await apiClient.get("/people");
  return response.data;
};

export const fetchPerson = async (id: string) => {
  const response = await apiClient.get(`/people/${id}`);
  return response.data;
};

export const deletePerson = async (id: string) => {
  const response = await apiClient.delete(`/people/${id}`);
  return response.data;
};

export const updatePerson = async (id: string, data: Person) => {
  const response = await apiClient.put(`/people/${id}`, data);
  return response.data;
};

export const savePerson = async (data: Person) => {
  const response = await apiClient.post("/people/", data);
  return response.data;
};
