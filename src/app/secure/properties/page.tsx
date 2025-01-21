"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { LuEllipsisVertical } from "react-icons/lu";
import { FaFileImport } from "react-icons/fa";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { usePropertyApi } from "@/hooks/usePropertyApi";

const PropertiesPage: React.FC = () => {
  const router = useRouter();
  const { properties, fetchProperties, deleteProperty } = usePropertyApi();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await fetchProperties();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleEditCompany = (companyId: string) => {
    router.push(`/secure/properties/property/${companyId}`);
  };

  const handleDeleteCompany = async (companyId: string) => {
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
        await deleteProperty(companyId);
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
          items={[{ href: "/secure/properties", label: "Propiedades" }]}
        />
        <div className="flex gap-2">
          <button
            onClick={() =>
              Swal.fire("Importar", "Funcionalidad no implementada", "info")
            }
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/properties/property")}
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
                <th className="px-4 py-2">Urbanizacion</th>
                <th className="px-4 py-2">Tipo Unidad</th>
                <th className="px-4 py-2">Número Unidad</th>
                <th className="px-4 py-2">Residentes</th>
                <th className="px-4 py-2">Fec. Creación</th>
                <th className="px-4 py-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property?._id}>
                  <td className="px-4 py-2">{property.urbanizationId?.name}</td>
                  <td className="px-4 py-2">{property.unitType}</td>
                  <td className="px-4 py-2">{property.unitNumber}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {property.residents.map((resident) => (
                        <div
                          key={resident?.name}
                          className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md"
                        >
                          {resident?.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{property.createdAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        onClick={() => handleEditCompany(property._id)}
                        className="bg-teal-500 p-2 rounded-md text-white font-bold"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(property._id)}
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
            Mostrando {properties.length} propiedad(es)
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {properties.map((property) => (
          <div
            key={property?._id}
            className="flex flex-col md:flex-row gap-4 rounded-md shadow-md bg-white p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-md font-bold">
                {property.urbanizationId?.name}
              </span>
              <div className="flex justify-center gap-2 items-center relative">
                <button
                  className="p-2 rounded-md font-bold"
                  onClick={() => {
                    const dropdown = document.getElementById(
                      `dropdown-${property._id}`
                    );
                    if (dropdown) {
                      dropdown.classList.toggle("hidden");
                    }
                  }}
                >
                  <LuEllipsisVertical />
                </button>
                <div
                  id={`dropdown-${property._id}`}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden"
                >
                  <button
                    onClick={() => handleEditCompany(property._id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(property._id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">{property.unitNumber}</div>
              <div className="flex flex-wrap gap-2">
                {property.residents.map((resident) => (
                  <div
                    key={resident?.name}
                    className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md"
                  >
                    {resident?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
