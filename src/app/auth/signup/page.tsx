import React from "react";
import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import SignupSVG from "@/assets/images/undraw_start-building_7gui.svg";
import AppLogo from "@/components/ui/AppLogo";
import Link from "next/link";
import {
  Box,
  Typography,
  Divider,
  Button,
  Container,
  Paper,
  Grid,
  Grid2,
} from "@mui/material";

const SignupPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ display: "flex", overflow: "hidden", borderRadius: 2 }}
      >
        <Box sx={{ p: 4, display: "flex", gap: 4 }}>
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  Crea una Cuenta Gratis
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Regístrate sin tarjeta de crédito y cancela tu suscripción en
                  cualquier momento.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <SignupForm />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  align="center"
                >
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/auth/signin" passHref>
                    <Button variant="text" color="primary">
                      Inicia sesión
                    </Button>
                  </Link>
                </Typography>
              </Box>
            </Grid2>
            <Grid2
              size={{ xs: 12, md: 6 }}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "md",
                  gap: 2,
                  bgcolor: "teal",
                  borderRadius: 4,
                  p: 4,
                }}
              >
                <Image
                  src={SignupSVG}
                  alt="Imagen"
                  className="w-full h-60"
                  width={200}
                  height={200}
                />
                <Typography
                  variant="body1"
                  color="white"
                  align="center"
                  sx={{ width: "100%" }}
                >
                  Administra tu urbanización y seguridad de manera eficiente con
                  nuestro plan básico. Disfruta de beneficios como la
                  construcción de presupuestos, sincronización con bancos y
                  categorización automática.
                </Typography>
                <Link href="/" passHref>
                  <Button
                    variant="text"
                    color="inherit"
                    sx={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Ver más información
                  </Button>
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    pt: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="span"
                    color="white"
                    fontWeight="bold"
                  >
                    Urbanoacceso
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
