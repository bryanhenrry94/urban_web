"use client";
import React from "react";
// mui material
import {
  Typography,
  Box,
  Container,
  Breadcrumbs,
  IconButton,
} from "@mui/material";
// icons
import { MdOutlineHome } from "react-icons/md";
// providers
import { JournalEntriesProvider } from "@/contexts/JournalEntriesContext";
// components
import SearchForm from "./SearchForm";
import JournalList from "./JournalList";

const JournalEntriesPage = () => {
  return (
    <JournalEntriesProvider>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 1,
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <IconButton color="primary">
              <MdOutlineHome size={20} />
            </IconButton>
            <Typography sx={{ color: "text.primary" }}>
              Asientos Contables
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
          <SearchForm />
        </Box>
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          <JournalList />
        </Box>
      </Container>
    </JournalEntriesProvider>
  );
};

export default JournalEntriesPage;
