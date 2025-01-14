"use client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, FormData } from "./validate";
import Swal from "sweetalert2";
import { changePassword } from "@/services/userService";
import { AxiosError } from "axios";

interface ChangePasswordProps {
  id: string;
}

const ChangePasswordForm: FC<ChangePasswordProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await changePassword(id, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      // Mostrar mensaje de éxito
      if (response && response.data) {
        Swal.fire({
          title: "Aviso",
          text: "Credenciales actualizadas con éxito!",
          icon: "success",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
        reset();
      } else
        Swal.fire({
          title: "Aviso",
          text: "No se pudo actualizar la contraseña",
          icon: "error",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
    } catch (error: AxiosError | any) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : (error as any).message;

      Swal.fire({
        title: "Aviso",
        text: `Error: ${errorMessage}`,
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  const validatePasswordMatch = (value: string) => {
    return value === getValues("newPassword") || "Las contraseñas no coinciden";
  };

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña Actual
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            {...register("oldPassword")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.oldPassword?.message}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="new-password"
          >
            Nueva Contraseña
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="******************"
            {...register("newPassword")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.newPassword?.message}
          </p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="******************"
            {...register("confirmPassword", {
              validate: validatePasswordMatch,
            })}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
