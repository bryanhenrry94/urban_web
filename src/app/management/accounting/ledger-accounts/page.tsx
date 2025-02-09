"use client";
import React from "react";
import {
  Typography,
  Box,
  Container,
  Breadcrumbs,
  IconButton,
} from "@mui/material";
import { MdOutlineHome } from "react-icons/md";
import TreeViewTable from "@/app/management/accounting/ledger-accounts/TreeViewTable";
import { ChartOfAccountsProvider } from "@/contexts/ChartOfAccountsContext";

import HeaderOptions from "./Header";

const ChartOfAccountsPage = () => {
  return (
    <ChartOfAccountsProvider>
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
              Plan de Cuentas
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
          <HeaderOptions />
          <Box
            sx={{
              mt: 2,
              overflow: "auto",
              maxWidth: { xs: 350, md: "100%" },
            }}
          >
            <TreeViewTable />
          </Box>
        </Box>
      </Container>
    </ChartOfAccountsProvider>
  );
};

export default ChartOfAccountsPage;
