"use client";
import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PersonForm from "@/components/forms/PersonForm";
import { useParams } from "next/navigation";

const PersonPage = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return (
    <div className="bg-white p-4 rounded-md">
      <Breadcrumb
        items={[
          { href: "/secure/people", label: "Personas" },
          { label: "Editar" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-teal-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Persona
        </div>
        <PersonForm id={id} />
      </div>
    </div>
  );
};

export default PersonPage;
