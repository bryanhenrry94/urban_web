"use client";

import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import PrivateLayout from "@/components/layouts/PrivateLayout";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status, data: session } = useSession();

  console.log("LayoutAdmin", status, session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black bg-opacity-20 fixed top-0 left-0 w-full z-50 p-2">
        <div className="loader"></div>
        <p className="text-lg mt-2">Validando Accesos</p>
      </div>
    );
  }

  return status === "authenticated" && <PrivateLayout>{children}</PrivateLayout>;
}
