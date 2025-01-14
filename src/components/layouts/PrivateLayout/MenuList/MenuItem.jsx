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
        font-medium rounded-md cursor-pointer text-white
        transition-colors group
        ${
          item.active
            ? "bg-gradient-to-tr from-green-600 to-green-700 text-green-800"
            : "hover:bg-green-600 text-gray-600"
        }
        `}
    >
      {item.icon}
      <span className={`overflow-hidden transition-all w-52 ml-3`}>
        {item.name}
      </span>
      {item.alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-green-400`} />
      )}
    </Link>
  );
};

export default MenuItem;
