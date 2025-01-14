"use client";
import { useState } from "react";
import MenuList from "@/components/layouts/PrivateLayout/MenuList";
import UserCard from "@/components/ui/UserCard";
import AppLogo from "@/components/ui/AppLogo";
import { useSession } from "next-auth/react";
import { FiMoreVertical } from "react-icons/fi";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();

  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Cierra el sidebar automáticamente en modo móvil
  };

  const handleOpenMenu = () => {
    console.log("handleOpenMenu");
    setOpenMenu(!openMenu);
  };

  const Menu = () => {
    return (
      <div
        className={`absolute top-12 right-0 bg-white w-52 rounded-md shadow-lg z-50 ${
          openMenu ? "block" : "hidden"
        }`}
      >
        <ul className="py-1 flex flex-col justify-center items-center">
          <Link
            href={`/secure/profile/${session?.user?.id}`}
            onClick={() => setOpenMenu(false)}
            className="text-sm w-full p-2 text-left"
          >
            Perfil
          </Link>
          <Link
            href={`/secure/settings`}
            onClick={() => setOpenMenu(false)}
            className="text-sm w-full p-2 text-left"
          >
            Configuración
          </Link>

          <button
            className="text-sm w-full p-2 text-left"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </button>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed flex flex-col justify-between inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transform transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 pb-4 flex items-center">
            <AppLogo />
          </div>
          <nav className="flex-1 overflow-y-auto">
            <MenuList handleLinkClick={handleLinkClick} />
          </nav>
          <div className="p-2">
            <UserCard />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 lg:ml-64">
          {/* Navbar */}
          <header className="flex items-center justify-between bg-white px-4 py-3 shadow-lg">
            <button
              className="text-green-600 focus:outline-none lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              UrbanoAcceso
            </h1>

            <div className="flex gap-1 justify-center items-center">
              <div className="hidden lg:flex justify-between items-center overflow-hidden translate-all">
                <div className="leading-4">
                  <h2 className="text-sm font-semibold">
                    {session?.user?.name}
                  </h2>
                  <span className="text-xs">{session?.user?.email}</span>
                </div>
              </div>
              <FiMoreVertical size={20} onClick={handleOpenMenu} />
            </div>
            <Menu />
          </header>

          <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PrivateLayout;
