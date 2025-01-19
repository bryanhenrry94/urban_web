"use client";
import React from "react";
import { useParams } from "next/navigation";
import CompanyForm from "@/components/forms/CompanyForm";

const CompanyEdit = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return <CompanyForm id={id} />;
};

export default CompanyEdit;
