import React, { ReactNode } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { MdLogout } from "react-icons/md";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession() as {
    data: (Session & { user: { id: string } }) | null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 shadow-md">
        <nav className="container mx-auto">
          <ul className="flex space-between justify-between items-center">
            <div className="flex gap-4">
              <Link
                href="/secure/dashboard"
                className="hover:underline font-bold"
              >
                Dashboard
              </Link>
              <Link
                href="/secure/companies"
                className="hover:underline font-bold"
              >
                Empresas
              </Link>
              <Link href="/secure/people" className="hover:underline font-bold">
                Personas
              </Link>
              <Link href="/secure/users" className="hover:underline font-bold">
                Usuarios
              </Link>
              <Link
                href={`/secure/profile/${session?.user?.id}`}
                className="hover:underline font-bold"
              >
                Perfil
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-sm font-semibold">
                {session ? session?.user?.email : "No hay sesión activa"}
              </span>
              <MdLogout size={20} onClick={() => signOut()} />
            </div>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4 flex-grow overflow-auto">
        {children}
      </main>
      <footer className="py-4 mt-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Dazzsoft. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
