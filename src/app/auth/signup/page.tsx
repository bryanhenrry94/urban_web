import React from "react";
import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import SignupSVG from "@/assets/images/undraw_start-building_7gui.svg";
import AppLogo from "@/components/ui/AppLogo";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="p-8 md:w-1/2">
          <AppLogo />
          <h1 className="text-3xl font-bold mb-4">Crea una Cuenta Gratis</h1>
          <p className="text-gray-600 mb-6">
            Regístrate sin tarjeta de crédito y cancela tu suscripción en
            cualquier momento.
          </p>
          <SignupForm />
          <hr className="my-6" />
          <p className="text-gray-600 text-center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/auth/signin" className="text-teal-500">
              Inicia sesión
            </a>
          </p>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-teal-500">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center w-full max-w-md gap-2">
              <Image
                src={SignupSVG}
                alt="Imagen"
                className="w-full h-60"
                width={200}
                height={200}
              />
              <p className="text-white text-center p-2 w-full">
                Administra tu urbanización y seguridad de manera eficiente con
                nuestro plan básico. Disfruta de beneficios como la construcción
                de presupuestos, sincronización con bancos y categorización
                automática.
              </p>
              <Link
                href="/"
                className="text-white font-bold hover:underline p-2 w-full text-center"
              >
                Ver más información
              </Link>
              <div className="flex items-center justify-center gap-2 pt-10">
                <span className="text-white font-bold text-2xl">
                  Urbanoacceso
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
