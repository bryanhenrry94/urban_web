"use client";
import React from "react";
import { useParams } from "next/navigation";
import ResidentForm from "@/components/forms/ResidentForm";

const UrbanizationPageEdit = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return <ResidentForm id={id} />;
};

export default UrbanizationPageEdit;
