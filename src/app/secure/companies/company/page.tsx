import React from "react";
import CompanyForm from "@/components/forms/CompanyForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

const CompanyPage = () => {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm">
      <Breadcrumb
        items={[
          { href: "/secure/companies", label: "Empresas" },
          { label: "Nuevo" },
        ]}
      />
      <div className="flex flex-col spaces-y-2 rounded-sm shadow-sm">
        <div className="w-full bg-teal-500 p-2 text-white font-extrabold rounded-t-md mb-2">
          Registro de Empresa
        </div>
        <CompanyForm />
      </div>
    </div>
  );
};

export default CompanyPage;
