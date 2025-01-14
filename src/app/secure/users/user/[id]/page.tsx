"use client";
import React from "react";
import { useParams } from "next/navigation";
import UserForm from "@/components/forms/UserForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

const UserPage = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return (
    <div className="bg-white p-4 rounded-md">
      <Breadcrumb
        items={[
          { href: "/secure/users", label: "Usuarios" },
          { label: "Editar" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-teal-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Usuario
        </div>
        <UserForm id={id} />
      </div>
    </div>
  );
};

export default UserPage;
