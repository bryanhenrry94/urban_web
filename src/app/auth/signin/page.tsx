import React from "react";
import Link from "next/link";
import Image from "next/image";
import BestPlaceImage from "@/assets/images/undraw_best-place_dhzp.svg";
import { FaHome } from "react-icons/fa";
import LoginForm from "@/components/forms/LoginForm";
import AppLogo from "@/components/ui/AppLogo";

const SigninPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:flex lg:w-full h-full bg-teal-500 ">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center w-full max-w-md gap-2">
            <div className="p-2 text-center w-full text-white font-bold">
              <h1 className="text-5xl">Una administración centralizada</h1>
            </div>
            <Image
              src={BestPlaceImage}
              alt="Imagen"
              className="w-full h-60"
              width={200}
              height={200}
            />
            <p className="text-white text-center p-2 w-full">
              Administra tu urbanización de manera eficiente, construye
              presupuestos, sincroniza con tus bancos y disfruta de la
              categorización automática.
            </p>
            <Link
              href="/"
              className="text-white font-bold hover:underline p-2 w-full text-center"
            >
              Aprende más sobre UrbanoAcceso
            </Link>
            <div className="flex items-center justify-center gap-2 pt-10">
              <FaHome className="text-white w-10 h-10" />
              <span className="text-white font-bold text-2xl">
                Urbanoacceso
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full bg-white w-full justify-center items-center p-4 lg:p-8 shadow-md lg:shadow-none">
        <div className="p-6 w-full max-w-md">
          <AppLogo />
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold py-4 text-gray-700 text-center">
              Inicio de Sesión
            </h1>
          </div>
          <span className="text-sm font-medium text-gray-500">
            Gestiona tu urbanización de manera eficiente y profesional
          </span>
          <div className="pt-4">
            <LoginForm />
          </div>
          <div className="flex justify-center p-2">
            <Link
              href="/"
              className="text-sm font-bold text-teal-500 hover:underline mt-4"
            >
              Olvidaste tu Contraseña
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
