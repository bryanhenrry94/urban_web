import React from "react";
// mui material
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// contexts
import { useChartOfAccountsContext } from "@/contexts/CostCentersContext";
// icons
import { FiMoreVertical } from "react-icons/fi";
// types
import { CostCenters } from "@/types/costCenters";

const Table = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { rows, setCostCenterSelected, handleDelete, handleEdit } =
    useChartOfAccountsContext();

  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: CostCenters
  ) => {
    setAnchorEl(event.currentTarget);
    setCostCenterSelected(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200, sortable: false },
    {
      field: "description",
      headerName: "Descripción",
      width: 300,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton onClick={(event) => handleClick(event, params.row)}>
              <FiMoreVertical />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleEdit();
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleDelete();
                }}
              >
                Eliminar
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        overflow: "auto",
      }}
    >
      <DataGrid
        rows={rows || []}
        columns={columns}
        getRowId={(row) => row._id} // Usa una propiedad única existente
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};

export default Table;
