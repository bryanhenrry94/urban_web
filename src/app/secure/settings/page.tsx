"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Avatar from "@/assets/images/avatar.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import ProfileForm from "@/components/forms/ProfileForm";
import NotificationsForm from "@/components/forms/NotificationsForm";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-6 text-left text-gray-800 font-semibold hover:bg-gray-100 focus:outline-none"
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 text-gray-700 bg-gray-50">{children}</div>
      )}
    </div>
  );
};

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    companyId?: string | null;
  };
}

const SettingsPage = () => {
  const { data: session } = useSession() as { data: CustomSession | null };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="mb-4">
        <Breadcrumb
          items={[{ href: "/secure/settings", label: "Configuración" }]}
        />
      </div>
      <div className="mt-4 w-full">
        <div className="flex items-center gap-2 justify-center rounded-md shadow p-4 max-w-md mx-auto lg:flex-col lg:text-center lg:rounded-full lg:shadow-none">
          <Image
            src={Avatar}
            alt="Avatar"
            className="rounded-full"
            width={75}
            height={75}
          />
          <div className="rounded-md">
            <h1 className="text-lg font-semibold">{session?.user?.name}</h1>
            <p className="text-sm font-normal ">{session?.user?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 bg-white shadow-md rounded-lg">
        <AccordionItem title="Perfil">
          <ProfileForm id={session?.user?.id ?? ""} />
        </AccordionItem>
        <AccordionItem title="Notificaciones">
          <NotificationsForm />
        </AccordionItem>
        <AccordionItem title="Contraseña">
          <ChangePasswordForm id={session?.user?.id} />
        </AccordionItem>
      </div>
    </div>
  );
};

export default SettingsPage;
