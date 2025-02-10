import React from "react";

import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

// Icons
import { Add, Delete, Description, Edit } from "@mui/icons-material";

import { useChartOfAccountsContext } from "@/contexts/ChartOfAccountsContext";

const MenuComponent: React.FC = () => {
  const {
    anchorEl,
    setAnchorEl,
    openMenu,
    setOpenModal,
    setModeEdit,
    accountSelected,
    loadAccounts,
  } = useChartOfAccountsContext();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClicAdd = () => {
    handleCloseMenu();
    setOpenModal(true);
    setModeEdit(false);
  };

  const handleClicEdit = () => {
    handleCloseMenu();
    setOpenModal(true);
    setModeEdit(true);
  };

  const handleClicDelete = async () => {
    handleCloseMenu();

    if (accountSelected == null) return;

    // await deleteAccount(accountSelected?._id);
    // loadAccounts();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleCloseMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuList>
        <MenuItem onClick={handleClicAdd}>
          <ListItemIcon>
            <Add color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Agregar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClicEdit}>
          <ListItemIcon>
            <Edit color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Modificar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClicDelete}>
          <ListItemIcon>
            <Delete color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Description color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ir a Mayor</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuComponent;
