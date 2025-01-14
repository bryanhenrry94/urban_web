"use client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, FormData } from "./validate";
import Swal from "sweetalert2";
import { changePassword } from "@/services/userService";

interface ChangePasswordProps {
  id?: string;
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
      if (!id) {
        Swal.fire({
          title: "Aviso",
          text: "Error: No se pudo actualizar la contraseña",
          icon: "error",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
        return;
      }

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
    } catch {
      Swal.fire({
        title: "Aviso",
        text: "Error: No se pudo actualizar la contraseña",
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
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="font-normal text-md mb-1" htmlFor="password">
            Contraseña Actual
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            {...register("oldPassword")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent w-full"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.oldPassword?.message}
          </p>
        </div>
        <div className="mb-4">
          <label className="font-normal text-md mb-1" htmlFor="new-password">
            Nueva Contraseña
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="******************"
            {...register("newPassword")}
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent w-full"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.newPassword?.message}
          </p>
          <p className="text-gray-600 text-sm">
            La contraseña debe tener al menos 8 caracteres, incluir al menos una
            letra mayúscula, una letra minúscula, un número, un carácter
            especial (!@#$%^&*, etc.), y no debe contener caracteres repetidos
            consecutivamente.
          </p>
        </div>
        <div className="mb-6">
          <label
            className="font-normal text-md mb-1"
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
            className="p-2 rounded-md border-2 font-normal text-md bg-transparent w-full"
          />
          <p className="text-red-500 font-normal text-sm mb-2">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
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
