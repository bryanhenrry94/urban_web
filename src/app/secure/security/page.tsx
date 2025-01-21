import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const SecurityPage = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb items={[{ href: "/secure/security", label: "Seguridad" }]} />
      </div>
    </div>
  );
};

export default SecurityPage;
