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
import { IJournalEntries, JournalEntriesTableProps } from "@/types"; // Adjust the import path as necessary
import { useJournalEntriesContext } from "@/contexts/JournalEntriesContext";

const TableJournal: FC<JournalEntriesTableProps> = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { handleDelete, rowSelected, setRowSelected } =
    useJournalEntriesContext();

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: IJournalEntries
  ) => {
    setAnchorEl(event.currentTarget);
    setRowSelected(row); // Guardar el ID seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setRowSelected(null);
  };

  const handleEdit = () => {
    router.push(`/management/accounting/journal-entries/${rowSelected?._id}`);
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
                <TableCell>{item.account?.name}</TableCell>
                <TableCell align="right">{item.debit.toFixed(2)}</TableCell>
                <TableCell align="right">{item.credit.toFixed(2)}</TableCell>
                <TableCell>{item.cost_center?.name}</TableCell>
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
