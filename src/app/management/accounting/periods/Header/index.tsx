import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import {
  MdOutlineAddCircle,
  MdOutlineDownload,
  MdOutlinePrint,
  MdOutlineRefresh,
} from "react-icons/md";

import { useAccountingPeriodsContext } from "@/contexts/AccountingPeriodsContext";

const HeaderOptions = () => {
  const { loadData, setOpenModal, setModeEdit, setRowSelected, setSearch } =
    useAccountingPeriodsContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClicRefresh = () => {
    loadData();
  };

  const handleClicAdd = () => {
    setModeEdit(false);
    setRowSelected(null);
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Buscar"
        onChange={handleSearchChange}
        size="small"
      />
      <Box>
        <IconButton>
          <MdOutlineRefresh onClick={handleClicRefresh} />
        </IconButton>
        <IconButton>
          <MdOutlineDownload />
        </IconButton>
        <IconButton>
          <MdOutlinePrint />
        </IconButton>
        <IconButton color="primary">
          <MdOutlineAddCircle onClick={handleClicAdd} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderOptions;
