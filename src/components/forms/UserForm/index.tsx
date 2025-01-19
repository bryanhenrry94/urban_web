"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { useUserApi } from "@/hooks/useUserApi";
import { useUrbanizationApi } from "@/hooks/useUrbanizationApi";
import { useResidentApi } from "@/hooks/useResidentApi";
import { User } from "@/types";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().required("El email es requerido"),
    role: yup.string().required("El rol es requerido"),
    status: yup.string().required("El estado es requerido"),
    urbanizationId: yup
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .notRequired(),
    residentId: yup
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .notRequired(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const UserForm: FC<{ id?: string }> = ({ id }) => {
  const { saveUser, updateUser, fetchUser } = useUserApi();
  const { urbanizations, fetchUrbanizations } = useUrbanizationApi();
  const { residents, fetchResidents } = useResidentApi();

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

  const loadUser = useCallback(async () => {
    try {
      if (!id) return;
      const currentUser = await fetchUser(id);

      setModeEdit(true);

      if (currentUser) {
        setValue("name", currentUser.name);
        setValue("email", currentUser.email);
        setValue("role", currentUser.role);
        setValue("status", currentUser.status);
        setValue("urbanizationId", currentUser?.urbanizationId);
        setValue("residentId", currentUser?.residentId);
      }
    } catch (error) {
      console.error("Error fetching urbanization:", error);
    }
  }, [id, setValue]);

  const loadUrbanizations = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchUrbanizations();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  const loadResidents = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchResidents();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    loadUrbanizations();
    loadResidents();
  }, []);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: User) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateUser(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await saveUser(data);
      }

      Swal.fire({
        title: "Aviso",
        text: "Registro actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/secure/users");
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
          <label htmlFor="email" className="font-normal text-md mb-1">
            Correo:
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Correo"
            disabled={modeEdit}
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.email?.message}
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
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="role" className="font-normal text-md mb-1">
            Rol:
          </label>
          <select
            id="role"
            {...register("role")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.role?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="status" className="font-normal text-md mb-1">
            Estado:
          </label>
          <select
            id="status"
            {...register("status")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.status?.message}
          </p>
        </div>
        <hr className="w-full border-2 my-4" />
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="urbanizationId" className="font-normal text-md mb-1">
            Urbanización:
          </label>
          <select
            id="urbanizationId"
            {...register("urbanizationId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">N/A</option>
            {urbanizations &&
              urbanizations.map((urbanization) => (
                <option key={urbanization._id} value={urbanization._id}>
                  {urbanization.name}
                </option>
              ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.urbanizationId?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor="residentId" className="font-normal text-md mb-1">
            Residente:
          </label>
          <select
            id="residentId"
            {...register("residentId")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent appearance-none"
          >
            <option value="">N/A</option>
            {residents &&
              residents.map((resident) => (
                <option key={resident._id} value={resident._id}>
                  {resident?.userId?.name}
                </option>
              ))}
          </select>
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.residentId?.message}
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

export default UserForm;
