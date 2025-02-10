import React from "react";
// mui material
import { Box, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// contexts
import { useChartOfAccountsContext } from "@/contexts/CostCentersContext";
// icons
import { FiMoreVertical } from "react-icons/fi";
// types
import { IAccountingPeriodAPI } from "@/types";
import { useAccountingPeriodsContext } from "@/contexts/AccountingPeriodsContext";
import dayjs from "dayjs";

const Table = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { rows, rowSelected, setRowSelected, handleDelete, setOpenModal } =
    useAccountingPeriodsContext();

  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: IAccountingPeriodAPI
  ) => {
    setAnchorEl(event.currentTarget);
    setRowSelected(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200, sortable: false },
    {
      field: "start_date",
      headerName: "Desde",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return params.row.start_date
          ? dayjs(params.row.start_date).format("DD/MM/YYYY")
          : "Indefinido";
      },
    },
    {
      field: "end_date",
      headerName: "Hasta",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return params.row.end_date
          ? dayjs(params.row.end_date).format("DD/MM/YYYY")
          : "Indefinido";
      },
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.status === "open" ? "Abierto" : "Cerrado"}
            color={params.row.status === "open" ? "primary" : "secondary"}
            sx={{
              color: "white",
              borderRadius: 2,
              p: 1,
              textAlign: "center",
            }}
          />
        );
      },
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
                  handleDelete(rowSelected?._id as string);
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
