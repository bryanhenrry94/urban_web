"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdOutlineLockReset } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { fetchUsers, deleteUser, resetPassword } from "@/services/userService";
import { APIUser } from "@/types/user";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<APIUser[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      const res = await fetchUsers();

      const { data } = res;
      console.log(data);
      setUsers(data);
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleEditUser = (userId: string) => {
    router.push(`/secure/users/user/${userId}`);
  };

  const handleResetPassword = async (email: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Se enviará un correo a ${email} con la nueva contraseña!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviarlo!",
    });

    if (result.isConfirmed) {
      try {
        // Realiza la solicitud de autenticación a tu API
        await resetPassword(email);

        loadData();
        Swal.fire(
          "Eliminado!",
          "Se ha enviado un correo con la nueva contrasena.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    });

    if (result.isConfirmed) {
      try {
        // Realiza la solicitud de autenticación a tu API
        await deleteUser(userId);

        loadData();
        Swal.fire("Eliminado!", "El usuario ha sido eliminada.", "success");
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb items={[{ href: "/secure/users", label: "Usuarios" }]} />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/secure/users/import")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/users/user")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <MdAdd />
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-4 rounded-md shadow-sm">
        <div className="w-full bg-green-500 p-2 text-white font-extrabold rounded-t-md">
          Búsqueda
        </div>
        <div className="flex gap-2 p-4 border-b-2 items-center">
          <label htmlFor="filtro" className="font-bold text-md">
            Filtro:
          </label>
          <input
            id="filtro"
            type="text"
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="font-bold">
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2">Creado</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Accion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?._id}>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-md">{user.email}</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">{user.name}</div>
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-md font-semibold">
                      {user?.companyId?.name}
                    </span>
                    <div className="text-sm text-gray-500">
                      <strong>RUC:</strong> {user?.companyId?.ruc}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">{user.createdAt}</td>
                <td className="px-4 py-2">
                  <div
                    className={`px-2 py-1 rounded-md ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status === "Active" ? "Activo" : "Inactivo"}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2 items-center">
                    <button
                      onClick={() => handleEditUser(user._id)}
                      className="bg-green-500 p-2 rounded-md text-white font-bold"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.email)}
                      className="bg-purple-500 p-2 rounded-md text-white font-bold"
                    >
                      <MdOutlineLockReset />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 p-2 rounded-md text-white font-bold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
