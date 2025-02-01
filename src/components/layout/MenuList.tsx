import React, { useState, useEffect } from "react";
import { Box, Divider, List, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { menuItemsList, MenuItem } from "./components/Menu/options";

import ListMinimizer from "./components/Menu/ListMinimizer";
import MenuItemList from "./components/Menu/MenuItemList";

interface NestedMenuProps {
  isExpanded: boolean;
}

const NestedMenu: React.FC<NestedMenuProps> = ({ isExpanded }) => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(menuItemsList);
  }, []);

  useEffect(() => {
    const initializeOpenItems = (items: MenuItem[], parents: string[] = []) => {
      items.forEach((item) => {
        const isActive = pathname === item.path;
        if (
          isActive ||
          (item.items && item.items.some((child) => pathname === child.path))
        ) {
          setOpenItems((prev) => [...prev, ...parents, item.name]);
        }
        if (item.items) {
          initializeOpenItems(item.items, [...parents, item.name]);
        }
      });
    };

    initializeOpenItems(menuItems.flatMap((group) => group.items || []));
  }, [pathname, menuItems]);

  const handleToggle = (name: string) => {
    setOpenItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <Box
      sx={{
        overflow: "auto",
        marginLeft: 2,
        marginTop: !isExpanded ? 2 : 0,
        "&:hover": {
          "&::-webkit-scrollbar": {
            width: "4px", // Ajusta el ancho del scrollbar aquí
          },
        },
        "&::-webkit-scrollbar": {
          width: "0px", // Oculta el scrollbar por defecto
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#0664755c",
        },
      }}
    >
      <List sx={{ marginRight: 2 }}>
        {menuItems.map((group) => (
          <React.Fragment key={group.name}>
            {isExpanded && (
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ pt: 2, fontWeight: "bold" }}
              >
                {group.name}
              </Typography>
            )}
            {isExpanded ? (
              <MenuItemList
                items={group.items || []}
                isExpanded={isExpanded}
                openItems={openItems}
                handleToggle={handleToggle}
              />
            ) : (
              <ListMinimizer
                key={group.name}
                items={group.items || []}
                isExpanded={isExpanded}
                openItems={openItems}
                handleToggle={handleToggle}
              />
            )}
            {isExpanded && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NestedMenu;
