import React, { FC } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FiMoreVertical } from "react-icons/fi";
import { IUserAPI } from "@/types";
import { useRouter } from "next/navigation";
import { UnitAPI } from "@/types/unit";
import Swal from "sweetalert2";
import { useUnitApi } from "@/hooks/useUnitApi";

interface TableProps {
  rows: UnitAPI[];
  refresh: () => void;
}

const Table: FC<TableProps> = ({ rows, refresh }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<IUserAPI | null>(null); // Estado para almacenar el ID seleccionado

  const { deleteUnit } = useUnitApi();

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: IUserAPI
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    router.push(`/management/units/${selectedRow?._id}`);
    handleClose();
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    });

    if (result.isConfirmed) {
      try {
        // Realiza la solicitud de autenticación a tu API
        await deleteUnit(selectedRow?._id as string);
        Swal.fire("Eliminado!", "La unidad ha sido eliminada.", "success");
        refresh();
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }

    handleClose();
  };

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "Tipo",
      width: 100,
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Nombre Unidad", width: 200, sortable: false },
    {
      field: "owner",
      headerName: "Propietario",
      width: 100,
      sortable: false,
      filterable: false,
    },
    {
      field: "residents",
      headerName: "Residentes",
      width: 100,
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
              <MenuItem onClick={handleEdit}>Editar</MenuItem>
              <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
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
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id} // Usa una propiedad única existente
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};

export default Table;
