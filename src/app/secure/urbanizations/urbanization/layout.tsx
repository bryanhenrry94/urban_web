import { ReactNode } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-md">
      <Breadcrumb
        items={[
          { href: "/secure/urbanizations", label: "Urbanizaciones" },
          { label: "Mantenimiento" },
        ]}
      />
      <div className="flex flex-col mb-4 rounded-sm shadow-sm">
        <div className="w-full bg-teal-500 p-2 text-white font-extrabold rounded-t-md">
          Registro de Urbanización
        </div>
        {children}
      </div>
    </div>
  );
}
