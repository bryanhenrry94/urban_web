import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Person, APIPerson } from "@/types/person";
import { AxiosError } from "axios";

export const usePersonApi = () => {
  const apiClient = useAxios();
  const [persons, setPersons] = useState<APIPerson[]>([]);
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

  const fetchPersons = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/persons");
      setPersons(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPerson = async (id: string) => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/persons/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const savePerson = async (person: Person) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/persons", person);
      setPersons((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePerson = async (id: string, updatedData: Partial<Person>) => {
    try {
      setLoading(true);

      const response = await apiClient.put(`persons/${id}`, updatedData);
      setPersons(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePerson = async (id: string) => {
    try {
      await apiClient.delete(`persons/${id}`);
      setPersons((prev) => prev.filter((person) => person._id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return {
    persons,
    loading,
    error,
    fetchPersons,
    fetchPerson,
    savePerson,
    updatePerson,
    deletePerson,
  };
};
