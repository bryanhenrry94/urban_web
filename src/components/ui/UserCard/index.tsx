import React from "react";
import { useSession } from "next-auth/react";
import { FiMoreVertical } from "react-icons/fi";

const UserCard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="border-t flex p-2 gap-2">
      <img
        src="https://ui-avatars.com/api/?background=55c271&color=fff&bold=true"
        alt=""
        className="w-8 h-8 rounded-md"
      />
      <div
        className={`flex justify-between items-center overflow-hidden translate-all "w-52 ml-3"`}
      >
        <div className="leading-4">
          <h4 className="font-semibold text-white">{session?.user?.name}</h4>
          <span className="text-xs text-white">{session?.user?.email}</span>
        </div>
        <FiMoreVertical size={20} className="text-white" />
      </div>
    </div>
  );
};

export default UserCard;
