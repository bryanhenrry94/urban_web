import React, { FC } from "react";
import { Box, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FiMoreVertical } from "react-icons/fi";
import { IUserAPI, UserTableProps } from "@/types";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useUserApi } from "@/hooks/useUserApi";

const Table: FC<UserTableProps> = ({ rows }) => {
  const { fetchUsers, forgotPassword } = useUserApi();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<IUserAPI | null>(null); // Estado para almacenar el ID seleccionado

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: IUserAPI
  ) => {
    console.log("row", row);
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    router.push(`/settings/users/${selectedRow?._id}`);
    handleClose();
  };

  const handleForgotPassword = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Se enviará un correo a ${selectedRow?.email} con la nueva contraseña!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviarlo!",
    });

    if (result.isConfirmed) {
      try {
        if (!selectedRow) return;
        // Realiza la solicitud de autenticación a tu API
        await forgotPassword(selectedRow?.email);
        await fetchUsers();

        Swal.fire(
          "Aviso!",
          "Se ha enviado un correo con la nueva contraseña.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "email", headerName: "Correo", width: 250 },
    {
      field: "country",
      headerName: "País",
      width: 130,
      renderCell: (params) => {
        return params.row?.profile?.country;
      },
    },
    {
      field: "phone",
      headerName: "Teléfono",
      width: 130,
      renderCell: (params) => {
        return params.row?.profile?.phone;
      },
    },
    {
      field: "role",
      headerName: "Rol",
      width: 100,
      renderCell: (params) => {
        return <Chip label={params.value} color="default" />;
      },
    },
    {
      field: "status",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => {
        if (params.value === "active") {
          return <Chip label="Activo" color="primary" />;
        } else {
          return <Chip label="Inactivo" color="error" />;
        }
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
              <MenuItem onClick={handleForgotPassword}>
                Resetear Contraseña
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row._id} // Usa una propiedad única existente
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
    />
  );
};

export default Table;
