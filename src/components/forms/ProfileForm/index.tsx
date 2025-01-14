"use client";
import React, { FC, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserProfile } from "@/types";
import { updateProfile, fetchUser } from "@/services/userService";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ProfileForm: FC<{ id: string }> = ({ id }) => {
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
      const res = await fetchUser(id);
      const { data } = res;

      setValue("name", data.name);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: UserProfile) => {
    try {
      if (!id) return;

      const response = await updateProfile(id, data);

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
      <div className="flex flex-wrap gap-2 space-y-4">
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
        <div className="flex w-full">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
