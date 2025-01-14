"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    email: yup.string().required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (response && response.ok) {
        router.push("/secure/dashboard");
      } else {
        Swal.fire({
          title: "Aviso",
          text: response?.error || "Credenciales incorrectas",
          icon: "error",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-lg border-gray-200 border-2 p-2 mb-2 text-gray-500"
          placeholder="Email"
        />
        <p className="text-red-500 font-normal text-sm mb-2">
          {errors.email?.message}
        </p>

        <input
          {...register("password")}
          type="password"
          className="w-full rounded-lg border-gray-200 border-2 p-2 mb-2 text-gray-500"
          placeholder="********"
        />
        <p className="text-red-500 font-normal text-sm mb-2">
          {errors.password?.message}
        </p>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-500 p-2 text-white font-bold hover:bg-green-600"
        >
          Ingresar
        </button>
      </form>
    </>
  );
};

export default LoginForm;
