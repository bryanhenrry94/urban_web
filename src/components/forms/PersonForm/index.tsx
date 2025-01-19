"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { usePersonApi } from "@/hooks/usePersonApi";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().required("El email es requerido"),
    identification: yup
      .string()
      .required("El número de identificación es requerido"),
    phone: yup.string().notRequired(),
    address: yup.string().notRequired(),
    roles: yup.array().of(yup.string()).required("El rol es requerido"),
    companyName: yup.string().notRequired(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const PersonForm: FC<{ id?: string }> = ({ id }) => {
  const { savePerson, updatePerson, fetchPerson, error } = usePersonApi();

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

  useEffect(() => {
    if (error) {
      Swal.fire({ title: "Aviso", text: error, icon: "error" });
    }
  }, [error]);

  const loadUser = useCallback(async () => {
    try {
      if (!id) return;
      const currentPerson = await fetchPerson(id);

      setModeEdit(true);

      if (currentPerson) {
        setValue("name", currentPerson.name);
        setValue("email", currentPerson.email);
        setValue("phone", currentPerson.phone);
        setValue("address", currentPerson.address);
        setValue("identification", currentPerson.identification);
        setValue("roles", currentPerson.roles);
        setValue("companyName", currentPerson.companyName);
      }
    } catch (error: Error | any) {
      Swal.fire({ title: "Aviso", text: error.message, icon: "error" });
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: FormData) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updatePerson(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await savePerson(data);
      }

      Swal.fire({
        title: "Aviso",
        text: `Usuario ${modeEdit ? "actualizado" : "guardado"} correctamente`,
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/secure/persons");
    } catch (error: Error | any) {
      Swal.fire({
        title: "Aviso",
        text: error.message,
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
          <label htmlFor="identification" className="font-normal text-md mb-1">
            Número de identificación:
          </label>
          <input
            id="identification"
            type="identification"
            {...register("identification")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
            placeholder="Número de identificación:"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.identification?.message}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="relative">
            <label htmlFor="roles" className="font-normal text-md mb-1">
              Rol:
            </label>
            <div className="p-2 rounded-md border-2 font-normal text-md bg-transparent">
              {["owner", "resident", "visitor"].map((role) => (
                <div key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    id={role}
                    value={role}
                    {...register("roles")}
                    className="mr-2"
                  />
                  <label htmlFor={role} className="font-normal text-md">
                    {role === "owner"
                      ? "Encargado"
                      : role === "resident"
                      ? "Propietario"
                      : "Visitante"}
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
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PersonForm;
