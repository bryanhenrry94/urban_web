import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const SettingsPage = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb items={[{ href: "/secure/settings", label: "Configuración" }]} />
      </div>
    </div>
  );
};

export default SettingsPage;
