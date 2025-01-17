"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Tipos para los datos del formulario
interface CompanyFormValues {
  name: string;
  ruc: string;
  address: string;
  phone: string;
}

interface AdminFormValues {
  name: string;
  email: string;
  idType: "cedula" | "ruc" | "passport";
  idNumber: string;
  phone: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}

interface SignupFormValues {
  company: CompanyFormValues;
  admin: AdminFormValues;
}

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error during signup");
      }

      setIsSubmitting(false);
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

 
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signup-form space-y-4 w-full rounded-lg"
    >
      {/* Datos Information */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="space-y-2">
          <label className="block">
            Nombre:
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("admin.name", { required: "Name is required" })}
            />
          </label>
          {errors.admin?.name && (
            <span className="text-red-500">{errors.admin.name.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Correo Electrónico:
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("admin.email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </label>
          {errors.admin?.email && (
            <span className="text-red-500">{errors.admin.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Tipo de Identificación:
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("admin.idType", {
                required: "ID type is required",
              })}
            >
              <option value="cedula">Cedula</option>
              <option value="ruc">RUC</option>
              <option value="passport">Passport</option>
            </select>
          </label>
          {errors.admin?.idType && (
            <span className="text-red-500">{errors.admin.idType.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Número de Identificación:
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("admin.idNumber", {
                required: "ID number is required",
              })}
            />
          </label>
          {errors.admin?.idNumber && (
            <span className="text-red-500">
              {errors.admin.idNumber.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Phone:
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("admin.phone", { required: "Phone is required" })}
            />
          </label>
          {errors.admin?.phone && (
            <span className="text-red-500">{errors.admin.phone.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block">
            Contraseña:
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              {...register("admin.password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
          </label>
          {errors.admin?.password && (
            <span className="text-red-500">
              {errors.admin.password.message}
            </span>
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
