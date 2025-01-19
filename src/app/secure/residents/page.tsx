"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useResidentApi } from "@/hooks/useResidentApi";

const ResidentsPage: React.FC = () => {
  const router = useRouter();
  const { residents, fetchResidents, deleteResident } = useResidentApi();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await fetchResidents();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleEditUrbanization = (companyId: string) => {
    router.push(`/secure/residents/resident/${companyId}`);
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
        await deleteResident(companyId);
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
          items={[{ href: "/secure/residents", label: "Residentes" }]}
        />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/secure/residents/import")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/residents/resident")}
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
                <th className="px-4 py-2">Urbanizacion</th>
                <th className="px-4 py-2">Propiedad</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Fec. Creación</th>
                <th className="px-4 py-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident?._id}>
                  <td className="px-4 py-2">{resident?.userId?.name}</td>
                  <td className="px-4 py-2">
                    {resident?.urbanizationId?.name}
                  </td>
                  <td className="px-4 py-2">
                    {resident?.propertyId?.unitNumber}
                  </td>
                  <td className="px-4 py-2">{resident?.email}</td>
                  <td className="px-4 py-2">{resident?.phone}</td>
                  <td className="px-4 py-2">{resident.createdAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        onClick={() => handleEditUrbanization(resident._id)}
                        className="bg-teal-500 p-2 rounded-md text-white font-bold"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUrbanization(resident._id)}
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
            Mostrando {residents.length} residentes
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {residents.map((resident) => (
          <div
            key={resident?._id}
            className="flex flex-col md:flex-row gap-4 rounded-md shadow-md bg-white p-4 mb-4"
          >
            <div className="flex flex-col">
              <span className="text-md font-bold">
                Urbanizacion: {resident.urbanizationId.name}
              </span>
              <span className="text-sm font-semibold">
                Residente: {resident?.userId?.name}
              </span>
              <span className="text-sm font-semibold">
                Unidad: {resident?.propertyId?.unitNumber}
              </span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <button
                onClick={() => handleEditUrbanization(resident._id)}
                className="bg-teal-500 p-2 rounded-md text-white font-bold"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDeleteUrbanization(resident._id)}
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

export default ResidentsPage;
