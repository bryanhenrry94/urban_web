import React, { FC } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useUnitApi } from "@/hooks/useUnitApi";
import { IJournalEntries, JournalEntriesTableProps } from "@/types"; // Adjust the import path as necessary

const TableJournal: FC<JournalEntriesTableProps> = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<IJournalEntries | null>(
    null
  );

  const { deleteUnit } = useUnitApi();

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: IJournalEntries
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    router.push(`/management/accounting/journal-entries/${selectedRow?._id}`);
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
      } catch (error) {
        Swal.fire("Error", (error as Error).message, "error");
      }
    }

    handleClose();
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        bgcolor: "background.paper",
        mt: 2,
        p: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">{row.reference}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {new Date(row.date).toLocaleDateString()} - {row.description}
          </Typography>
        </Box>
        <IconButton onClick={(event) => handleClick(event, row)}>
          <FiMoreVertical />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Cuenta</TableCell>
              <TableCell align="right" sx={{ width: 120 }}>
                Debe
              </TableCell>
              <TableCell align="right" sx={{ width: 120 }}>
                Haber
              </TableCell>
              <TableCell align="left">Centro de Costo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row?.details?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.ledgerAccount?.name}</TableCell>
                <TableCell align="right">{item.debit.toFixed(2)}</TableCell>
                <TableCell align="right">{item.credit.toFixed(2)}</TableCell>
                <TableCell>{item.costCenter?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Totales
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {row.details
                  ?.reduce((acc, item) => acc + item.debit, 0)
                  .toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {row.details
                  ?.reduce((acc, item) => acc + item.credit, 0)
                  .toFixed(2)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableJournal;
