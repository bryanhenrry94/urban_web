"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import LogoDefault from "@/assets/images/logo-default.png";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { fetchCompanies, deleteCompany } from "@/services/companyService";
import { APICompany } from "@/types/company";

const CompaniesPage: React.FC = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<APICompany[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchCompanies();
      const { data } = res;
      setCompanies(data);
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const handleEditCompany = (companyId: string) => {
    router.push(`/secure/companies/company/${companyId}`);
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
        await deleteCompany(companyId);
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
          items={[{ href: "/secure/companies", label: "Empresas" }]}
        />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/secure/companies/import")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFileImport />
          </button>
          <button
            onClick={() => router.push("/secure/companies/company")}
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
                <th className="px-4 py-2">Logo</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Contacto</th>
                <th className="px-4 py-2">Creado</th>
                <th className="px-4 py-2">API KEY</th>
                <th className="px-4 py-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company?._id}>
                  <td className="px-4 py-2">
                    <div>
                      <Image
                        src={company.logo || LogoDefault}
                        alt={`Logo of ${company.name}`}
                        width={50}
                        height={50}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <span className="text-md font-bold">{company.name}</span>
                      <div className="text-sm text-gray-500">
                        <strong>RUC:</strong> {company.ruc}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div>
                      <strong>Direccion:</strong> {company.address}
                    </div>
                    <div>
                      <strong>Telefono:</strong> {company.phone}
                    </div>
                    <div>
                      <strong>Email:</strong> {company.email}
                    </div>
                  </td>
                  <td className="px-4 py-2">{company.createdAt}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-gray-500 p-2 rounded-md text-white font-bold"
                      onClick={() => {
                        navigator.clipboard.writeText(company.apiKey);
                        Swal.fire(
                          "Aviso",
                          "La API KEY ha sido copiada al portapapeles",
                          "success"
                        );
                      }}
                    >
                      <MdOutlineContentCopy />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2 items-center">
                      <button
                        onClick={() => handleEditCompany(company._id)}
                        className="bg-teal-500 p-2 rounded-md text-white font-bold"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company._id)}
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
            Mostrando {companies.length} empresas
          </div>
        </div>
      </div>
      <div>
        {companies.map((company) => (
          <div
            key={company?._id}
            className="flex flex-col md:flex-row gap-4 rounded-md shadow-md bg-white p-4 mb-4"
          >
            <div className="flex justify-center items-center">
              <Image
                src={company.logo || LogoDefault}
                alt={`Logo of ${company.name}`}
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold">{company.name}</span>
              <div className="text-sm text-gray-500">
                <strong>RUC:</strong> {company.ruc}
              </div>
              <div>
                <strong>Direccion:</strong> {company.address}
              </div>
              <div>
                <strong>Telefono:</strong> {company.phone}
              </div>
              <div>
                <strong>Email:</strong> {company.email}
              </div>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <button
                onClick={() => handleEditCompany(company._id)}
                className="bg-teal-500 p-2 rounded-md text-white font-bold"
              >
                <MdEdit />
              </button>
              <button
                className="bg-gray-500 p-2 rounded-md text-white font-bold"
                onClick={() => {
                  navigator.clipboard.writeText(company.apiKey);
                  Swal.fire(
                    "Aviso",
                    "La API KEY ha sido copiada al portapapeles",
                    "success"
                  );
                }}
              >
                <MdOutlineContentCopy />
              </button>
              <button
                onClick={() => handleDeleteCompany(company._id)}
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

export default CompaniesPage;
