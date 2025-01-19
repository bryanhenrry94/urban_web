"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";

import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { usePersonApi } from "@/hooks/usePersonApi";

const PeoplePage: React.FC = () => {
  const { fetchPersons, deletePerson, persons, loading, error } =
    usePersonApi();

  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (error) {
      Swal.fire("Error", error, "error");
    }
  }, [error]);

  const loadData = async () => {
    await fetchPersons();
  };

  const handleEditPerson = (companyId: string) => {
    router.push(`/secure/persons/person/${companyId}`);
  };

  const handleDeletePerson = async (companyId: string) => {
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
      await deletePerson(companyId);
      Swal.fire("Eliminado!", "La empresa ha sido eliminada.", "success");
    }
  };

  return (
    <div className="p-4 rounded-md">
      <div className="flex justify-between items-center mb-4 ">
        <Breadcrumb items={[{ href: "/secure/persons", label: "Personas" }]} />
        <div className="flex gap-2">
          <button
            onClick={() => loadData()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            <LuRefreshCw />
          </button>
          <button
            onClick={() => router.push("/secure/persons/import")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/persons/person")}
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
                <th className="px-4 py-2">Persona</th>
                <th className="px-4 py-2">Roles</th>
                <th className="px-4 py-2">Creado</th>
                <th className="px-4 py-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person?._id}>
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <div>
                          <span className="text-md font-semibold">
                            {person.name}
                          </span>
                          <div className="flex gap-2 items-center">
                            <MdEmail size={20} />
                            <p className="text-sm text-gray-500">
                              {person.email}
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <MdContactPhone size={20} />
                            <p className="text-sm text-gray-500">
                              {person.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {person.roles.map((role, index) => (
                        <div
                          key={index}
                          className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{person.createdAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        onClick={() => handleEditPerson(person._id)}
                        className="bg-teal-500 p-2 rounded-md text-white font-bold"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDeletePerson(person._id)}
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
            Mostrando {persons.length} empresas
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}
      <div className="md:hidden">
        {persons.map((person) => (
          <div
            key={person._id}
            className="flex flex-col border-b-2 p-2 bg-white rounded-md shadow-md mb-4"
          >
            <div className="flex gap-2 items-center">
              <div>
                <span className="text-md font-semibold">{person.name}</span>
                <div className="flex gap-2 items-center">
                  <MdEmail size={20} />
                  <p className="text-sm text-gray-500">{person.email}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MdContactPhone size={20} />
                  <p className="text-sm text-gray-500">{person.phone}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => handleEditPerson(person._id)}
                className="bg-teal-500 p-2 rounded-md text-white font-bold"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDeletePerson(person._id)}
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

export default PeoplePage;
