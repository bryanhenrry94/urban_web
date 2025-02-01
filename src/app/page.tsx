import React from "react";
import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 12,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        Bienvenido a UrbanoAcceso
      </Typography>
      <Typography variant="body1" gutterBottom>
        ¡Comienza a gestionar urbanizaciones o condominios gratis!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Button
          component={Link}
          href="/auth/signin"
          variant="contained"
          color="primary"
          fullWidth
        >
          Iniciar sesión
        </Button>
        <Button
          component={Link}
          href="/auth/signup"
          variant="contained"
          color="secondary"
          fullWidth
        >
          Registrar
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
