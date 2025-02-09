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
import { CostCentersProvider } from "@/contexts/CostCentersContext";
// components
import HeaderOptions from "./Header";
import Table from "./Table";
import FormCostCenter from "./Form";

const CostCenterPage = () => {
  return (
    <CostCentersProvider>
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
              Centro de Costos
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
          <FormCostCenter />
        </Box>
      </Container>
    </CostCentersProvider>
  );
};

export default CostCenterPage;
