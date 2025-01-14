import React from "react";
import Link from "next/link";

const MenuItem = ({ item, handleItemClick }) => {
  return (
    <Link
      href={item.route}
      onClick={() => {
        handleItemClick(item._id);
      }}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer text-gray-600  
        
        ${
          item.active
            ? "bg-gradient-to-tr from-teal-600 to-teal-700 text-white"
            : "hover:bg-teal-600 hover:text-white"
        }
        `}
    >
      {item.icon}
      <span className={`overflow-hidden w-52 ml-3`}>
        {item.name}
      </span>
      {item.alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-teal-400`} />
      )}
    </Link>
  );
};

export default MenuItem;
