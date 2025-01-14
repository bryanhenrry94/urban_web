"use client";
import React from "react";
import { useParams } from "next/navigation";
import CompanyForm from "@/components/forms/CompanyForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

const CompanyEdit = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return (
    <div>
      <Breadcrumb
        items={[
          { href: "/secure/companies", label: "Empresas" },
          { label: "Editar" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-green-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Empresa
        </div>
        <CompanyForm id={id} />
      </div>
    </div>
  );
};

export default CompanyEdit;
