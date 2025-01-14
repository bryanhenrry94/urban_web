import Breadcrumb from "@/components/ui/Breadcrumb";
import React from "react";

const HomesPage = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb
          items={[{ href: "/secure/houses", label: "Propiedades" }]}
        />
      </div>
    </div>
  );
};

export default HomesPage;
