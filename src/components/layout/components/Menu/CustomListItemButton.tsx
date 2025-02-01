import { ListItemButton } from "@mui/material";

interface ICustomListItemButton {
  isActive: boolean;
  isExpanded: boolean;
  darkMode: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  isParent: boolean | false;
}

export const CustomListItemButton = ({
  children,
  isActive,
  isExpanded,
  darkMode,
  isParent,
  onClick,
}: ICustomListItemButton & { isParent?: boolean }) => {
  const activeBackgroundColor = darkMode ? "#008080" : "#0080804a"; // teal color
  const activeColor = darkMode ? "white" : "#008080"; // teal color
  const hoverBackgroundColor = darkMode ? "#008080" : "#0080804a"; // teal color
  const hoverColor = darkMode ? "white" : "#008080"; // teal color

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        minHeight: 48,
        justifyContent: isExpanded ? "flex-start" : "center",
        px: 2.5,
        borderRadius: "8px",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        backgroundColor:
          isActive && isParent ? activeBackgroundColor : "transparent",
        color: isActive ? activeColor : "inherit",
        fontWeight: isActive ? "bold" : "normal",
        "&:hover": {
          backgroundColor: hoverBackgroundColor,
          color: hoverColor,
          "& .MuiListItemIcon-root": {
            color: hoverColor,
          },
          "& .MuiTypography-root": {
            color: hoverColor,
            fontWeight: "bold",
          },
        },
      }}
    >
      {children}
    </ListItemButton>
  );
};
