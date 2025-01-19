"use client";
import React from "react";
import PersonForm from "@/components/forms/PersonForm";
import { useParams } from "next/navigation";

const PersonPage = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return <PersonForm id={id} />;
};

export default PersonPage;
