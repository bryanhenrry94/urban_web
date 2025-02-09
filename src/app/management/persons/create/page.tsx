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
import PersonForm from "@/components/forms/PersonForm";

const AddPersonPage = () => {
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
          <Typography sx={{ color: "text.primary" }}>Nuevo</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
        <Box sx={{ mt: 2 }}>
          <PersonForm />
        </Box>
      </Box>
    </Container>
  );
};

export default AddPersonPage;
