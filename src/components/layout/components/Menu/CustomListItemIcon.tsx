import { ListItemIcon } from "@mui/material";

interface ICustomListItemIcon {
  isExpanded: boolean;
  children: React.ReactNode;
}

export const CustomListItemIcon = ({
  children,
  isExpanded,
}: ICustomListItemIcon) => {
  return (
    <ListItemIcon
      sx={{
        minWidth: 0,
        justifyContent: "center",
        mr: isExpanded ? 1.2 : "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </ListItemIcon>
  );
};
