"use client";
import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Avatar from "@/assets/images/avatar.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { AccordionItem } from "@/components/ui/AccordionItem";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import ProfileForm from "@/components/forms/ProfileForm";
import NotificationsForm from "@/components/forms/NotificationsForm";

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    companyId?: string | null;
  };
}

const AccountPage = () => {
  const { data: session } = useSession() as { data: CustomSession | null };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="mb-4">
        <Breadcrumb items={[{ href: "/secure/account", label: "Cuenta" }]} />
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

export default AccountPage;
