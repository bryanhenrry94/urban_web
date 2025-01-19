"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { countries } from "./countries";

// Tipos para los datos del formulario
interface CompanyFormValues {
  name: string;
  identification: string;
  address: string;
  phone: string;
}

interface AdminFormValues {
  name: string;
  email: string;
  country: string;
  identification: string;
  phone: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}

interface RegisterFormValues {
  company: CompanyFormValues;
  admin: AdminFormValues;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
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
    } catch (error: any) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signup-form space-y-2 w-full rounded-lg"
    >
      <div className="space-y-2">
        <label className="block">
          País:
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            defaultValue="EC"
            {...register("admin.country", {
              required: "País es requerido",
            })}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        {errors.admin?.country && (
          <span className="text-red-500">{errors.admin.country.message}</span>
        )}
      </div>
      <div className="space-y-2">
        <label className="block">
          Identificación:
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            {...register("admin.identification", {
              required: "Identificación es requerida",
            })}
          />
        </label>
        {errors.admin?.identification && (
          <span className="text-red-500">
            {errors.admin.identification.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label className="block">
          Teléfono:
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            {...register("admin.phone", {
              required: "Teléfono es requerido",
            })}
          />
        </label>
        {errors.admin?.phone && (
          <span className="text-red-500">{errors.admin.phone.message}</span>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
