import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a UrbanoAcceso</h1>
      <p className="text-lg mb-8">
        ¡Comienza a gestionar urbanizaciones o condominios gratis!
      </p>
      <div className="flex justify-between gap-4 w-full max-w-xs">
        <Link
          href="/auth/signin"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 w-full text-center"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition duration-300 w-full text-center"
        >
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default Home;
