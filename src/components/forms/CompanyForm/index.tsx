"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import {
  fetchCompany,
  updateCompany,
  saveCompany,
} from "@/services/companyService";
import { Company } from "@/types";

const schema = yup
  .object({
    ruc: yup.string().required("El RUC es requerido"),
    name: yup.string().required("El nombre es requerido"),
    address: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    email: yup.string().email().required("El correo es requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CompanyForm: FC<{ id?: string }> = ({ id }) => {
  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const getCompany = useCallback(async () => {
    try {
      if (!id) return;

      const res = await fetchCompany(id);

      const { data } = res;

      setModeEdit(true);

      setValue("ruc", data.ruc);
      setValue("name", data.name);
      setValue("address", data.address);
      setValue("phone", data.phone);
      setValue("email", data.email);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getCompany();
    }
  }, [id, getCompany]);

  const onSubmit = async (data: Company) => {
    try {
      if (modeEdit) {
        if (!id) return;

        const response = await updateCompany(id, data);

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
            text: response?.error || "Error al guardar la empresa",
            icon: "error",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
        }
      } else {
        // Realiza la solicitud de autenticación a tu API
        const response = await saveCompany(data);

        if (response && response.data) {
          router.push("/secure/companies");
        } else {
          Swal.fire({
            title: "Aviso",
            text: response?.error || "Error al guardar la empresa",
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
        text: "Error al guardar la empresa",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col w-full lg:w-1/4">
          <label htmlFor="ruc" className="font-normal text-md mb-1">
            RUC:
          </label>
          <input
            id="ruc"
            type="text"
            {...register("ruc")}
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="RUC"
            disabled={modeEdit ? true : false}
          />
          <p className="text-red-500 font-normal text-sm mt-1">
            {errors.ruc?.message}
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
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="Nombre"
          />
          <p className="text-red-500 font-normal text-sm mt-1">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="address" className="font-normal text-md mb-1">
            Dirección:
          </label>
          <input
            id="address"
            type="text"
            {...register("address")}
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="Dirección"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/4">
          <label htmlFor="phone" className="font-normal text-md mb-1">
            Teléfono:
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone")}
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="Teléfono"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="email" className="font-normal text-md mb-1">
            Correo:
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Correo no válido",
              },
            })}
            className="p-2 rounded-md border border-gray-300 font-normal text-md bg-white"
            placeholder="Correo"
          />
          <p className="text-red-500 font-normal text-sm mt-1">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CompanyForm;
