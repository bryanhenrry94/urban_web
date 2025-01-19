import { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Property, PropertyAPI } from "@/types/property";
import { AxiosError } from "axios";

export const usePropertyApi = () => {
  const apiClient = useAxios();
  const [properties, setProperties] = useState<PropertyAPI[]>([]);
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

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/properties");
      setProperties(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperty = async (id: string) => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/properties/${id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProperty = async (person: Property) => {
    try {
      setLoading(true);

      const response = await apiClient.post("/properties", person);
      setProperties((prev) => [...prev, response.data.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id: string, updatedData: Partial<Property>) => {
    try {
      setLoading(true);

      const response = await apiClient.put(`properties/${id}`, updatedData);
      setProperties(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await apiClient.delete(`properties/${id}`);
      setProperties((prev) => prev.filter((person) => person._id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return {
    properties,
    loading,
    error,
    fetchProperties,
    fetchProperty,
    saveProperty,
    updateProperty,
    deleteProperty,
  };
};
