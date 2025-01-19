"use client";
import React from "react";
import { useParams } from "next/navigation";
import UrbanizationForm from "@/components/forms/UrbanizationForm";

const UrbanizationPageEdit = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return <UrbanizationForm id={id} />;
};

export default UrbanizationPageEdit;
