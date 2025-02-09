"use client";
import React from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { MdOutlineHome } from "react-icons/md";
import { useParams } from "next/navigation";
import PersonForm from "@/components/forms/PersonForm";

const EditUnitPage = () => {
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
            href="/management/persons"
            style={{ textDecoration: "none" }}
          >
            Personas
          </Link>
          <Typography sx={{ color: "text.primary" }}>Editar</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
        <Box sx={{ mt: 2 }}>
          <PersonForm id={id} />
        </Box>
      </Box>
    </Container>
  );
};

export default EditUnitPage;
