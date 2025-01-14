import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "@/assets/images/avatar.png"

const UserCard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex p-2 gap-2">
      <Image
        src={Avatar}
        alt=""
        className="w-8 h-8 rounded-md"
        width={50}
        height={50}
      />
      <div
        className={`flex justify-between items-center overflow-hidden translate-all "w-52 ml-3"`}
      >
        <div className="leading-4">
          <h4 className="font-semibold text-white">{session?.user?.name}</h4>
          <span className="text-xs text-white">{session?.user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
