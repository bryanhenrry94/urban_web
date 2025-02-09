import { useChartOfAccountsContext } from "@/contexts/ChartOfAccountsContext";
import { usePersonApi } from "@/hooks/usePersonApi";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  MdOutlineDownload,
  MdOutlinePrint,
  MdOutlineRefresh,
} from "react-icons/md";

const HeaderOptions = () => {
  const [search, setSearch] = useState("");
  const { accountsTree, loadAccountsTree } = useChartOfAccountsContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = accountsTree?.filter(
    (accounts) =>
      accounts?.name?.toLowerCase().includes(search.toLowerCase()) ||
      accounts?.code?.toLowerCase().includes(search.toLowerCase())
  );

  const handleClicRefresh = async () => {
    await loadAccountsTree();
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
      </Box>
    </Box>
  );
};

export default HeaderOptions;
