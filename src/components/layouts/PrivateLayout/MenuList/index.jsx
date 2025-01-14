import React from "react";

import { LuUserCog } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuBuilding } from "react-icons/lu";

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
    name: "Configuración",
    route: "/secure/settings",
    icon: <LuSettings2 />,
  },
  {
    _id: "7",
    name: "Empresas",
    route: "/secure/companies",
    icon: <LuSettings2 />,
  },
];

const MenuList = ({ handleLinkClick }) => {
  const handleItemClick = (id) => {
    handleLinkClick(id);

    items.forEach((item) => {
      item.active = item._id === id;
    });
  };

  return (
    <ul className="flex-1 px-3">
      {items.map((item) => (
        <MenuItem
          key={item._id}
          item={item}
          handleItemClick={handleItemClick}
        />
      ))}
    </ul>
  );
};

export default MenuList;
