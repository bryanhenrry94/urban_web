"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useUrbanizationApi } from "@/hooks/useUrbanizationApi";

const UrbanizationsPage: React.FC = () => {
  const router = useRouter();
  const { urbanizations, fetchUrbanizations, deleteUrbanization } =
    useUrbanizationApi();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await fetchUrbanizations();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleEditUrbanization = (companyId: string) => {
    router.push(`/secure/urbanizations/urbanization/${companyId}`);
  };

  const handleDeleteUrbanization = async (companyId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUrbanization(companyId);
        loadData();
        Swal.fire("Eliminado!", "La empresa ha sido eliminada.", "success");
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  return (
    <div className="p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb
          items={[{ href: "/secure/urbanizations", label: "Urbanizaciones" }]}
        />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/secure/urbanizations/import")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/urbanizations/urbanization")}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            <MdAdd />
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex flex-col mb-4 rounded-md shadow-sm bg-white">
          <div className="w-full bg-teal-500 p-2 text-white font-extrabold rounded-t-md">
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
        <div className="overflow-x-auto rounded-md shadow-md bg-white">
          <table className="min-w-full border-collapse">
            <thead className="font-bold">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Servicios</th>
                <th className="px-4 py-2">Fec. Creación</th>
                <th className="px-4 py-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {urbanizations.map((urbanization) => (
                <tr key={urbanization?._id}>
                  <td className="px-4 py-2">{urbanization.name}</td>
                  <td className="px-4 py-2">{urbanization.address}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {urbanization?.services?.map((service) => (
                        <div
                          key={service.name}
                          className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md"
                        >
                          {service.name} - ${service.rate}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{urbanization.createdAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        onClick={() => handleEditUrbanization(urbanization._id)}
                        className="bg-teal-500 p-2 rounded-md text-white font-bold"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteUrbanization(urbanization._id)
                        }
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
          <div className="p-2 text-center">
            Mostrando {urbanizations.length} urbanizacion(es)
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {urbanizations.map((urbanization) => (
          <div
            key={urbanization?._id}
            className="flex flex-col md:flex-row gap-4 rounded-md shadow-md bg-white p-4 mb-4"
          >
            <div className="flex flex-col">
              <span className="text-md font-bold">{urbanization.name}</span>
              <strong>Dirección:</strong> {urbanization.address}
            </div>
            <div className="flex justify-center gap-2 items-center">
              <button
                onClick={() => handleEditUrbanization(urbanization._id)}
                className="bg-teal-500 p-2 rounded-md text-white font-bold"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDeleteUrbanization(urbanization._id)}
                className="bg-red-500 p-2 rounded-md text-white font-bold"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrbanizationsPage;
