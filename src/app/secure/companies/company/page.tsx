import React from "react";
import CompanyForm from "@/components/forms/CompanyForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

const CompanyPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { href: "/secure/companies", label: "Empresas" },
          { label: "Nuevo" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-green-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Empresa
        </div>
        <CompanyForm />
      </div>
    </div>
  );
};

export default CompanyPage;
