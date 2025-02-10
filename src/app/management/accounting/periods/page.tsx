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
import { AccountingPeriodProvider } from "@/contexts/AccountingPeriodsContext";
// components
import HeaderOptions from "./Header";
import Table from "./Table";
import FormPeriod from "./Form";

const PeriodsPage = () => {
  return (
    <AccountingPeriodProvider>
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
              Periodos Contables
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
            <Table />
          </Box>
          <FormPeriod />
        </Box>
      </Container>
    </AccountingPeriodProvider>
  );
};

export default PeriodsPage;
