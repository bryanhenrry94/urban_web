"use client";
import { FunctionComponent, MouseEventHandler } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AppIcon, AppLink } from "@/components/common";
import { LinkToPage } from "@/utils";
import { usePathname } from "next/navigation";

interface Props extends LinkToPage {
  openInNewTab?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
}

/**
 * Renders Navigation Item for SideBar, detects current url and sets selected state if needed
 * @component SideBarNavItem
 */
const SideBarNavItem: FunctionComponent<Props> = ({
  openInNewTab,
  icon,
  path,
  selected: propSelected = false,
  subtitle,
  title,
  onClick,
}) => {
  const pathname = usePathname();
  const selected =
    propSelected ||
    (path && path.length > 1 && pathname.startsWith(path)) ||
    false;

  return (
    <ListItemButton
      component={AppLink}
      selected={selected}
      to={path}
      href="" // Hard reset for .href property, otherwise links are always opened in new tab :(
      openInNewTab={openInNewTab}
      onClick={onClick}
    >
      <ListItemIcon>{icon && <AppIcon icon={icon} />}</ListItemIcon>
      <ListItemText primary={title} secondary={subtitle} />
    </ListItemButton>
  );
};

export default SideBarNavItem;
