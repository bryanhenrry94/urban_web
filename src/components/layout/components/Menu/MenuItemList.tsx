import React from "react";
import { List, ListItem } from "@mui/material";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useAppStore } from "@/store"; // Ajusta esta importación según tu ruta real
import { usePathname } from "next/navigation";
import { CustomListItemButton } from "./CustomListItemButton"; // Ajusta según tu ruta real
import { CustomListItemIcon } from "./CustomListItemIcon"; // Ajusta según tu ruta real
import { CustomItemText } from "./CustomItemText"; // Ajusta según tu ruta real
import { MenuItem } from "./options";
import Link from "next/link";

interface MenuItemListProps {
  items: MenuItem[];
  isExpanded: boolean;
  openItems: string[];
  handleToggle: (name: string) => void;
}

const MenuItemList: React.FC<MenuItemListProps> = ({
  items,
  isExpanded,
  openItems,
  handleToggle,
}) => {
  const state = useAppStore()[0];
  const pathname = usePathname();

  const renderMenuItems = (items: MenuItem[]): React.ReactElement => {
    const isAnyChildActive = (items: MenuItem[]): boolean => {
      return items.some((item) =>
        item.items ? isAnyChildActive(item.items) : pathname === item.path
      );
    };

    return (
      <>
        {items.map((item) => {
          const itemIsActive =
            pathname === item.path ||
            (item.items && isAnyChildActive(item.items));

          return (
            <React.Fragment key={item.name}>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  mb: 1,
                }}
              >
                {item.items ? (
                  <CustomListItemButton
                    darkMode={state.darkMode}
                    isActive={itemIsActive || false}
                    isExpanded={isExpanded}
                    onClick={() => handleToggle(item.name)}
                    isParent={item.isParent || false}
                  >
                    <CustomListItemIcon isExpanded={isExpanded}>
                      {item.icon &&
                        React.cloneElement(
                          item.icon as React.ReactElement<any>,
                          {
                            style: {
                              fontSize: `${isExpanded ? "1.2" : "1.5"}em`,
                            },
                            color: itemIsActive
                              ? state.darkMode
                                ? "white"
                                : "darkcyan"
                              : "inherit",
                          }
                        )}
                    </CustomListItemIcon>
                    <CustomItemText text={item.name} isExpanded={isExpanded} />
                    {item.items &&
                      (openItems.includes(item.name) ? (
                        <AiOutlineUp size="0.6em" />
                      ) : (
                        <AiOutlineDown size="0.6em" />
                      ))}
                  </CustomListItemButton>
                ) : (
                  <Link
                    href={item.path || "#"}
                    passHref
                    legacyBehavior
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CustomListItemButton
                      darkMode={state.darkMode}
                      isActive={itemIsActive || false}
                      isExpanded={isExpanded}
                      isParent={false}
                    >
                      <CustomListItemIcon isExpanded={isExpanded}>
                        {item.icon &&
                          React.cloneElement(
                            item.icon as React.ReactElement<any>,
                            {
                              size: `${isExpanded ? "1.2" : "1.5"}em`,
                              color: itemIsActive
                                ? state.darkMode
                                  ? "white"
                                  : "darkcyan"
                                : "inherit",
                            }
                          )}
                      </CustomListItemIcon>
                      <CustomItemText
                        text={item.name}
                        isExpanded={isExpanded}
                      />
                    </CustomListItemButton>
                  </Link>
                )}
              </ListItem>
              {item.items && openItems.includes(item.name) && (
                <List
                  disablePadding
                  sx={{ pl: 4, listStyleType: "disc", paddingLeft: 2 }}
                >
                  {renderMenuItems(item.items)}
                </List>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return renderMenuItems(items);
};

export default MenuItemList;
