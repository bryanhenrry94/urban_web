import React, { FC } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FiMoreVertical } from "react-icons/fi";
import { IPersonAPI, PersonTableProps } from "@/types";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { usePersonApi } from "@/hooks/usePersonApi";

const Table: FC<PersonTableProps> = ({ rows, refresh }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<IPersonAPI | null>(null); // Estado para almacenar el ID seleccionado

  const { deletePerson } = usePersonApi();

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: IPersonAPI
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    router.push(`/management/persons/${selectedRow?._id}`);
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
        await deletePerson(selectedRow?._id as string);
        Swal.fire("Eliminado!", "La persona ha sido eliminada.", "success");
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
    {
      field: "name",
      headerName: "Nombres",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        if (params.row?.name && params.row?.surname) {
          return `${params.row?.name} ${params.row?.surname}`;
        }

        if (params.row?.companyName) return params.row?.companyName;

        return "";
      },
    },
    {
      field: "numberId",
      headerName: "Número ID",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return params.row.roles.join(", ");
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
