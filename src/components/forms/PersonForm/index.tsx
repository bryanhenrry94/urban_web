"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { APICompany, Person } from "@/types";
import {
  savePerson,
  updatePerson,
  fetchPerson,
} from "@/services/personService";
import { fetchCompanies } from "@/services/companyService";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().required("El email es requerido"),
    phone: yup.string().notRequired(),
    address: yup.string().notRequired(),
    idType: yup.string().required("El tipo de identificación es requerido"),
    idNumber: yup.string().required("El número de identificación es requerido"),
    roles: yup.array().of(yup.string()).required("El rol es requerido"),
    companyName: yup.string().notRequired(),
    companyId: yup.string().required("La empresa es requerida"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const PersonForm: FC<{ id?: string }> = ({ id }) => {
  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const [companies, setCompanies] = useState<APICompany[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const loadUser = useCallback(async () => {
    try {
      if (!id) return;
      const res = await fetchPerson(id);
      const { data } = res;

      setModeEdit(true);

      setValue("name", data.name);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("address", data.address);
      setValue("idType", data.idType);
      setValue("idNumber", data.idNumber);
      setValue("roles", data.roles);
      setValue("companyName", data.companyName);
      setValue("companyId", data.companyId);
    } catch (error) {
      console.error("Error fetching person:", error);
    }
  }, [id, setValue]);

  const loadCompanies = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      const res = await fetchCompanies();

      const { data } = res;
      setCompanies(data);
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: Person) => {
    try {
      if (modeEdit) {
        if (!id) return;
        const response = await updatePerson(id, data);

        if (response && response.data) {
          Swal.fire({
            title: "Aviso",
            text: "Registro actualizado correctamente",
            icon: "success",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: response?.error || "Error al guardar el usuario",
            icon: "error",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        }
      } else {
        // Realiza la solicitud de autenticación a tu API
        const response = await savePerson(data);

        if (response && response.data) {
          router.push("/secure/people");
        } else {
          Swal.fire({
            title: "Aviso",
            text: response?.error || "Error al guardar el usuario",
            icon: "error",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar el usuario",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-2 p-4 border-b-2">
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="companyId" className="font-normal text-md mb-1">
            Empresa:
          </label>
          <select
            id="companyId"
            {...register("companyId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">Seleccione una empresa</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.companyId?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="name" className="font-normal text-md mb-1">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Nombre"
            disabled={modeEdit ? true : false}
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="email" className="font-normal text-md mb-1">
            Correo:
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Correo"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="idType" className="font-normal text-md mb-1">
            Tipo Documento:
          </label>
          <select
            id="idType"
            {...register("idType")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="cedula">Cedula</option>
            <option value="ruc">Ruc</option>
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.idType?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="idNumber" className="font-normal text-md mb-1">
            Número Documento:
          </label>
          <input
            id="idNumber"
            type="idNumber"
            {...register("idNumber")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Número Documento"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.idNumber?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="relative">
            <label htmlFor="roles" className="font-normal text-md mb-1">
              Rol:
            </label>
            <div className="p-2 rounded-md border-2 font-normal text-md bg-transparent">
              {["customer", "supplier", "employee"].map((role) => (
                <div key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    id={role}
                    value={role}
                    {...register("roles")}
                    className="mr-2"
                  />
                  <label htmlFor={role} className="font-normal text-md">
                    {role === "customer"
                      ? "Cliente"
                      : role === "supplier"
                      ? "Proveedor"
                      : "Empleado"}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-red-500 font-normal text-sm mb-2">
              {errors.roles?.message}
            </p>
          </div>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.roles?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="companyName" className="font-normal text-md mb-1">
            Razon Social:
          </label>
          <input
            id="companyName"
            type="companyName"
            {...register("companyName")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Razon Social"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.companyName?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="address" className="font-normal text-md mb-1">
            Dirección:
          </label>
          <input
            id="address"
            type="address"
            {...register("address")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Dirección"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.address?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="phone" className="font-normal text-md mb-1">
            Teléfono:
          </label>
          <input
            id="phone"
            type="phone"
            {...register("phone")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Teléfono"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.phone?.message}
          </p>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PersonForm;
