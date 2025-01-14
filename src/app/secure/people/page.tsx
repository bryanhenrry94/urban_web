"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import LogoDefault from "@/assets/images/logo-default.png";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { APIPerson } from "@/types/person";
import { fetchPeople, deletePerson } from "@/services/personService";

const PeoplePage: React.FC = () => {
  const router = useRouter();
  const [people, setPeople] = useState<APIPerson[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchPeople();

      const { data } = res;
      setPeople(data);
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleEditPerson = (companyId: string) => {
    router.push(`/secure/people/person/${companyId}`);
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
      try {
        // Realiza la solicitud de autenticación a tu API
        await deletePerson(companyId);

        loadData();
        Swal.fire("Eliminado!", "La empresa ha sido eliminada.", "success");
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb items={[{ href: "/secure/people", label: "Personas" }]} />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/secure/people/import")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/people/person")}
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
              <th className="px-4 py-2">Persona</th>
              {/* <th className="px-4 py-2">Razon Social</th> */}
              {/* <th className="px-4 py-2">Dirección</th> */}
              <th className="px-4 py-2">Roles</th>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2">Creado</th>
              <th className="px-4 py-2">Accion</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person?._id}>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={person.logo || LogoDefault}
                        alt={`Logo of ${person.name}`}
                        width={50}
                        height={50}
                      />
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
                {/* <td className="px-4 py-2">{person.companyName}</td>
                <td className="px-4 py-2">{person.address}</td> */}
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    {person.roles.map((role, index) => (
                      <div
                        key={index}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-md"
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-md font-semibold">
                      {person?.companyId?.name}
                    </span>
                    <div className="text-sm text-gray-500">
                      <strong>RUC:</strong> {person?.companyId?.ruc}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">{person.createdAt}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2 items-center">
                    <button
                      onClick={() => handleEditPerson(person._id)}
                      className="bg-green-500 p-2 rounded-md text-white font-bold"
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
          Mostrando {people.length} empresas
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
