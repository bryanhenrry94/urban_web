"use client";
import React from "react";
import { useParams } from "next/navigation";
import UserForm from "@/components/forms/UserForm";

const UserPage = () => {
  const params = useParams();

  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return <UserForm id={id} />;
};

export default UserPage;
