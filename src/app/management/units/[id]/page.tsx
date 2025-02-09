"use client";
import React from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { MdOutlineHome } from "react-icons/md";
import { useParams } from "next/navigation";
import UnitForm from "@/components/forms/UnitForm";
import { CustomTabPanel } from "@/components/common/CustomTabPanel";

const EditUnitPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const params = useParams();
  const { id } = params as { id: string }; // Obtiene el parámetro dinámico "id"

  return (
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
          <Link
            color="inherit"
            href="/management/units"
            style={{ textDecoration: "none" }}
          >
            Unidades
          </Link>
          <Typography sx={{ color: "text.primary" }}>Editar</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
        <Box sx={{ mt: 2 }}></Box>
        <Box sx={{ mt: 2, width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Unidad"
                id="simple-tab-0"
                aria-label="simple-tabpanel-0"
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Miembros"
                id="simple-tab-1"
                aria-label="simple-tabpanel-1"
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Seguridad y Accesos"
                id="simple-tab-2"
                aria-label="simple-tabpanel-2"
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <UnitForm id={id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default EditUnitPage;
