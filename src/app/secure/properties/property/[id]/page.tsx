"use client";
import React from "react";
import { useParams } from "next/navigation";
import PropertyForm from "@/components/forms/PropertyForm";

const PropertyPageEdit = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return <PropertyForm id={id} />;
};

export default PropertyPageEdit;
