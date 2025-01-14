import React from "react";
import UserForm from "@/components/forms/UserForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

const UserPage = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <Breadcrumb
        items={[
          { href: "/secure/users", label: "Usuarios" },
          { label: "Nuevo" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-teal-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Usuario
        </div>
        <UserForm />
      </div>
    </div>
  );
};

export default UserPage;
