import Link from "next/link";
import Image from "next/image";
import BestPlaceImage from "@/assets/images/undraw_best-place_dhzp.svg";
import { FaHome } from "react-icons/fa";
import LoginForm from "@/components/forms/LoginForm";
import AppLogo from "@/components/ui/AppLogo";

const SigninPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 h-full bg-teal-500">
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
      <div className="p-6 w-full h-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-lg p-4 bg-white rounded-lg shadow-md gap-4">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full p-4 rounded-lg gap-4">
              <AppLogo />
              <h1 className="text-2xl font-semibold text-center text-gray-700">
                Inicio de Sesión
              </h1>
              <span className="text-sm font-medium text-gray-500">
                Todavia no tienes una cuenta?{" "}
                <Link
                  href="/auth/signup"
                  className="text-teal-600 hover:underline"
                >
                  Registrate
                </Link>
              </span>
              <LoginForm />
              <Link
                href="/"
                className="text-sm font-bold text-teal-600 hover:underline text-center"
              >
                Olvidaste tu Contraseña
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
