"use client";
import { useAppStore } from "@/store";
import React, { useState } from "react";
import {
  Box,
  Popover,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CustomListItemButton } from "./CustomListItemButton";
import { CustomListItemIcon } from "./CustomListItemIcon";
import { CustomItemText } from "./CustomItemText";
import { MenuItem } from "./options";

interface MenuItemListProps {
  items: MenuItem[];
  isExpanded: boolean;
  openItems: string[];
  handleToggle: (name: string) => void;
}

interface MenuItemProps {
  item: MenuItem;
  isExpanded: boolean;
  itemIsActive: boolean;
  darkMode: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ListMinimizer: React.FC<MenuItemListProps> = ({
  items,
  isExpanded,
  openItems,
  handleToggle,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [submenuItems, setSubmenuItems] = useState<MenuItem[]>([]);
  const [state] = useAppStore();
  const open = Boolean(anchorEl);
  const pathname = usePathname();

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    subItems?: MenuItem[]
  ) => {
    setAnchorEl(event.currentTarget);
    if (subItems) {
      setSubmenuItems(subItems);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuItems([]);
  };

  const renderMenuItems = (items: MenuItem[]): React.ReactElement => (
    <>
      {items.map((item) => (
        <ListItem
          key={item.name}
          disablePadding
          sx={{
            display: "block",
          }}
        >
          <React.Fragment key={item.name}>
            <>
              {item.items && item.items.length > 0 ? (
                <ListItemButton onClick={() => handleToggle(item.name)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.name} />
                  {openItems.includes(item.name) ? (
                    <AiOutlineUp size="0.6em" />
                  ) : (
                    <AiOutlineDown size="0.6em" />
                  )}
                </ListItemButton>
              ) : (
                <Link href={item.path || "#"} passHref legacyBehavior>
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemButton>
                      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </a>
                </Link>
              )}
            </>
            {item.items && openItems.includes(item.name) && (
              <Box sx={{ paddingLeft: 2 }}>{renderMenuItems(item.items)}</Box>
            )}
          </React.Fragment>
        </ListItem>
      ))}
    </>
  );

  const isAnyChildActive = (items: MenuItem[]): boolean => {
    return items.some((item) =>
      item.items ? isAnyChildActive(item.items) : pathname === item.path
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ListItem
        disablePadding
        sx={{
          display: "block",
        }}
      >
        {items.map((item) => {
          const itemIsActive =
            pathname === item.path ||
            (item.items && isAnyChildActive(item.items));
          return (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                display: "block",
                pb: 1,
              }}
            >
              <MenuOption
                key={item.name}
                handleClick={(event) => handleClick(event, item.items)}
                item={item}
                isExpanded={isExpanded}
                itemIsActive={itemIsActive || false}
                darkMode={state.darkMode}
              />
            </ListItem>
          );
        })}
      </ListItem>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            marginLeft: state.TRLMode ? -70 : 70,
            width: 250,
            maxHeight: 400,
            overflow: "auto",
          },
        }}
      >
        {renderMenuItems(submenuItems)}
      </Popover>
    </Box>
  );
};

const MenuOption: React.FC<MenuItemProps> = ({
  item,
  isExpanded,
  itemIsActive,
  darkMode,
  handleClick,
}) => {
  return (
    <>
      {item.items ? (
        <CustomListItemButton
          darkMode={darkMode}
          isActive={itemIsActive || false}
          isExpanded={isExpanded}
          isParent={item.isParent || false}
          key={item.name}
          onClick={handleClick}
        >
          <CustomListItemIcon isExpanded={isExpanded}>
            {item.icon &&
              React.cloneElement(item.icon as React.ReactElement<any>, {
                size: `${isExpanded ? "1.2" : "1.5"}em`,
                color: itemIsActive
                  ? darkMode
                    ? "white"
                    : "darkcyan"
                  : "inherit",
              })}
          </CustomListItemIcon>
          <CustomItemText text={item.name} isExpanded={isExpanded} />
        </CustomListItemButton>
      ) : (
        <Link href={item.path || "#"} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <CustomListItemButton
              darkMode={darkMode}
              isActive={itemIsActive || false}
              isExpanded={isExpanded}
              isParent={item.isParent || false}
              key={item.name}
            >
              <CustomListItemIcon isExpanded={isExpanded}>
                {item.icon &&
                  React.cloneElement(item.icon as React.ReactElement<any>, {
                    size: `${isExpanded ? "1.2" : "1.5"}em`,
                    color: itemIsActive
                      ? darkMode
                        ? "white"
                        : "darkcyan"
                      : "inherit",
                  })}
              </CustomListItemIcon>
              <CustomItemText text={item.name} isExpanded={isExpanded} />
            </CustomListItemButton>
          </a>
        </Link>
      )}
    </>
  );
};

export default ListMinimizer;
