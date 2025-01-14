"use client";
import { useState } from "react";
import MenuList from "@/components/layouts/PrivateLayout/MenuList";
import UserCard from "@/components/ui/UserCard";
import AppLogo from "@/components/ui/AppLogo";
import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Cierra el sidebar automáticamente en modo móvil
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
          <div className="p-6 pb-4 flex items-center justify-center">
            <AppLogo />
          </div>
          <div className="p-2">
            <UserCard />
          </div>
          <nav className="flex-1 overflow-y-auto">
            <MenuList handleLinkClick={handleLinkClick} />
          </nav>
          <div className="border-t p-2 flex items-center justify-between py-2 px-3 my-1 font-medium cursor-pointer transition-colors duration-300 bg-green-700">
            <button
              className="flex items-center text-sm w-full p-2 text-left "
              onClick={() => signOut()}
            >
              <MdOutlineLogout size={20} className="text-white" />
              <span className="ml-3 text-lg">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 lg:ml-64">
          {/* Navbar */}
          <header className="flex items-center justify-between bg-white px-4 py-3 shadow-lg lg:hidden">
            <button
              className="text-green-600 focus:outline-none"
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
