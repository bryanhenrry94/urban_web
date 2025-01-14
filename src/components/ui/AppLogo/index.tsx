import React from "react";
import Image from "next/image";
import UrbanoAccesoLogo from "@/assets/images/UrbanoAcceso.svg";

const AppLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <Image src={UrbanoAccesoLogo} alt="logo" width={32} height={32} />
      <span
        className={`text-md font-bold text-teal-700 overflow-hidden translate-all "w-32"`}
      >
        URBANOACCESO
      </span>
    </div>
  );
};

export default AppLogo;
