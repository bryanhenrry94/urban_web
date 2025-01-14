"use client";
import React, { FC } from "react";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useParams } from "next/navigation";

const ChangePasswordPage: FC = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb items={[{ href: "/secure/profile", label: "Perfil" }]} />
      </div>
      <div className="flex flex-col mb-4 rounded-md shadow-sm">
        <div className="w-full bg-green-500 p-2 text-white font-extrabold rounded-t-md">
          Actualizar contraseña
        </div>
        <div className="flex gap-2 p-4 border-b-2 items-center">
          <ChangePasswordForm id={id} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
