"use client";
import { useState } from "react";
import MenuList from "@/components/layouts/PrivateLayout/MenuList";
import UserCard from "@/components/ui/UserCard";
import AppLogo from "@/components/ui/AppLogo";
import { LuMenu } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Avatar from "@/assets/images/avatar-svgrepo-com.svg";
import Image from "next/image";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Cierra el sidebar automáticamente en modo móvil
  };

  return (
    <div className="flex flex-row min-h-screen bg-white">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed flex flex-col justify-between inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:translate-x-0 bg-white shadow-sm ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 pb-4 flex items-center justify-center">
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
          <header className="flex items-center justify-between lg:justify-end bg-white px-4 py-3 shadow-sm">
            <button
              className="text-teal-600 focus:outline-none lg:hidden hover:text-teal-800"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <LuMenu size={20} />
            </button>
            <div className="flex items-center gap-1">
              <Image
                src={Avatar}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-normal text-sm hidden md:block">
                {session?.user?.name}
              </span>
            </div>
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
