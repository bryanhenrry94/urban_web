import React, { useState } from "react";

import { LuUserCog } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuBuilding } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";

const items = [
  {
    _id: "1",
    name: "Dashboard",
    route: "/secure/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    _id: "3",
    name: "Personas",
    route: "/secure/people",
    icon: <LuUserCog />,
  },
  {
    _id: "4",
    name: "Propiedades",
    route: "/secure/homes",
    icon: <LuBuilding />,
  },
  {
    _id: "5",
    name: "Usuarios",
    route: "/secure/users",
    icon: <LuUsers />,
  },
  {
    _id: "6",
    name: "Empresas",
    route: "/secure/companies",
    icon: <LuSettings2 />,
  },
];

const MenuList = ({ handleLinkClick }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (id) => {
    setActiveItem(id);
    handleLinkClick(id);
  };

  return (
    <ul className="flex-1 px-3">
      {items.map((item) => (
        <MenuItem
          key={item._id}
          item={item}
          handleItemClick={handleItemClick}
          isActive={item._id === activeItem}
        />
      ))}
      <hr className="my-2 border-gray-300" />
      <MenuItem
        key={7}
        item={{
          _id: "7",
          name: "Configuración",
          route: "/secure/settings",
          icon: <LuSettings2 />,
        }}
        handleItemClick={handleItemClick}
      />
      <MenuItem
        key={8}
        item={{
          _id: "8",
          name: "Cerrar Sesión",
          route: "/auth/signin",
          icon: <LuLogOut />,
        }}
        handleItemClick={() => signOut()}
      />
    </ul>
  );
};

export default MenuList;
