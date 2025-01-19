"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { usePropertyApi } from "@/hooks/usePropertyApi";
import { useResidentApi } from "@/hooks/useResidentApi";
import { useUrbanizationApi } from "@/hooks/useUrbanizationApi";
import { useUserApi } from "@/hooks/useUserApi";
import { Resident } from "@/types/resident";

const schema = yup
  .object({
    userId: yup.string().required("El usuario es requerido"),
    urbanizationId: yup.string().required("La urbanizacion es requerida"),
    propertyId: yup.string().required("La propiedad es requerida"),
    email: yup.string().required("El correo es requerido"),
    phone: yup.string().required("El teléfono es requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ResidentForm: FC<{ id?: string }> = ({ id }) => {
  const { users, fetchUsers } = useUserApi();
  const { urbanizations, fetchUrbanizations } = useUrbanizationApi();
  const { properties, fetchProperties } = usePropertyApi();
  const { fetchResident, saveResident, updateResident } = useResidentApi();

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

  const loadData = useCallback(async () => {
    try {
      if (!id) return;
      const currentResident = await fetchResident(id);

      setModeEdit(true);

      if (currentResident) {
        setValue("userId", currentResident.userId);
        setValue("urbanizationId", currentResident?.urbanizationId);
        setValue("propertyId", currentResident.propertyId);
        setValue("email", currentResident.email);
        setValue("phone", currentResident.phone);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, [id, setValue]);

  const loadUsers = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchUsers();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const loadUrbanizations = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchUrbanizations();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const loadProperties = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchProperties();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    loadUsers();
    loadUrbanizations();
    loadProperties();
  }, []);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, loadData]);

  const onSubmit = async (data: Resident) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateResident(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await saveResident(data);
      }

      Swal.fire({
        title: "Aviso",
        text: "Registro actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/secure/residents");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar el residente",
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
          <label htmlFor="userId" className="font-normal text-md mb-1">
            Usuario:
          </label>
          <select
            id="userId"
            {...register("userId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">Seleccione una usuario</option>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.userId?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="urbanizationId" className="font-normal text-md mb-1">
            Urbanización:
          </label>
          <select
            id="urbanizationId"
            {...register("urbanizationId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">Seleccione una urbanizacion</option>
            {urbanizations &&
              urbanizations.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.urbanizationId?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="propertyId" className="font-normal text-md mb-1">
            Propiedad:
          </label>
          <select
            id="propertyId"
            {...register("propertyId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">Seleccione una propiedad</option>
            {properties &&
              properties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.unitNumber}
                </option>
              ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.propertyId?.message}
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
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResidentForm;
