import React from "react";
import { useRouter } from "next/navigation";
// mui material
import { Box, IconButton, TextField } from "@mui/material";
// icons
import {
  MdOutlineAddCircle,
  MdOutlineDownload,
  MdOutlinePrint,
  MdOutlineRefresh,
} from "react-icons/md";
import { useJournalEntriesContext } from "@/contexts/JournalEntriesContext";

const SearchForm = () => {
  const router = useRouter();

  const { loadJournalEntries, setSearch } = useJournalEntriesContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClicRefresh = () => {
    loadJournalEntries();
  };

  const handleClicAdd = () => {
    router.push("/management/accounting/journal-entries/create");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "flex-start", md: "space-between" },
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Buscar"
        onChange={handleSearchChange}
        size="small"
        sx={{ width: { xs: "100%", md: "50%" } }}
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

export default SearchForm;
