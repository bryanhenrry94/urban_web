import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PersonForm from "@/components/forms/PersonForm";

const PersonPage = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <Breadcrumb
        items={[
          { href: "/secure/people", label: "Personas" },
          { label: "Nuevo" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-green-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Persona
        </div>
        <PersonForm />
      </div>
    </div>
  );
};

export default PersonPage;
