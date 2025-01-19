"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "@/services/authService";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await signup(data);

      console.log("response: ", response);

      if (response.status === "error") {
        throw new Error(response.message);
      }

      setIsSubmitting(false);

      await Swal.fire({
        title: "Aviso",
        text: "Registro exitoso",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });

      navigate.push("/auth/signin");
    } catch (error) {
      setIsSubmitting(false);

      // Primero verificamos si el error es un AxiosError
      if (error instanceof AxiosError) {
        return Swal.fire(
          "Error",
          error.response?.data.message || "Unknown Axios error",
          "error"
        );
      }

      // Si no es un AxiosError, entonces verificamos si es un Error genérico
      if (error instanceof Error) {
        return Swal.fire("Error", error.message, "error");
      }

      // Si el error no es ni un AxiosError ni un Error genérico, mostramos un error genérico
      return Swal.fire("Error", "Error during signup", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signup-form space-y-2 w-full rounded-lg"
    >
      {/* Información de Acceso */}
      <div className="flex flex-col gap-1">
        <div className="space-y-1">
          <label className="block">
            Nombre:
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("name", { required: "Nombre es requerido" })}
            />
          </label>
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Correo Electrónico:
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("email", {
                required: "Correo Electrónico es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Contraseña:
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("password", {
                required: "Contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default SignupForm;
