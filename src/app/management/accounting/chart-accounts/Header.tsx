import React, { useState } from "react";
import {
  MdOutlineDownload,
  MdOutlinePrint,
  MdOutlineRefresh,
  MdImportContacts,
} from "react-icons/md";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useChartOfAccountsContext } from "@/contexts/ChartOfAccountsContext";

const HeaderOptions = () => {
  const [search, setSearch] = useState("");
  const { accountsTree, loadAccountsTree } = useChartOfAccountsContext();
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = accountsTree?.filter(
    (accounts) =>
      accounts?.name?.toLowerCase().includes(search.toLowerCase()) ||
      accounts?.code?.toLowerCase().includes(search.toLowerCase())
  );

  const handleClicRefresh = async () => {
    console.log("refresh");
    await loadAccountsTree();
  };

  const handleClicImport = () => {
    router.push("/management/accounting/chart-accounts/import");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <TextField
        placeholder="Buscar"
        onChange={handleSearchChange}
        size="small"
      /> */}
      <Box>
        <IconButton>
          <MdOutlineRefresh onClick={handleClicRefresh} />
        </IconButton>
        <IconButton>
          <MdOutlineDownload />
        </IconButton>
        <IconButton>
          <MdImportContacts onClick={handleClicImport} />
        </IconButton>
        <IconButton>
          <MdOutlinePrint />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderOptions;
