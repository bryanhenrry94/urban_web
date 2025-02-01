"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SignupSVG from "@/assets/images/undraw_start-building_7gui.svg";
// Removed unused imports
import { LuCircle } from "react-icons/lu";
import {
  Button,
  Container,
  Paper,
  Typography,
  Grid2 as Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import { FaHome } from "react-icons/fa";

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: "Información de la Empresa" },
    { id: 2, title: "Información de la Cuenta" },
    { id: 3, title: "Preferencias" },
  ];

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography
              variant="h5"
              component="h1"
              align="center"
              gutterBottom
              fontStyle={{ fontWeight: "bold" }}
            >
              Registro de Urbanización
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                p: 2,
              }}
            >
              {steps.map((item) => (
                <React.Fragment key={item.id}>
                  {item.id === 1 ? (
                    <LuCircle
                      style={{
                        color: "teal",
                        fill: item.id === step ? "teal" : "none",
                        stroke: "teal",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Divider sx={{ bgcolor: "teal", width: 40 }} />
                      <LuCircle
                        style={{
                          color: "teal",
                          fill: item.id === step ? "teal" : "none",
                          stroke: "teal",
                        }}
                      />
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Box>
            {step === 1 && (
              <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  Información de la Urbanización
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  id="urbanizacion-nombre"
                  label="Nombre de la Urbanización"
                  placeholder="Ejemplo: Urbanización Los Jardines"
                  size="small"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="id-fiscal"
                  label="ID Fiscal (DNI o Número de Identificación)"
                  placeholder="Ejemplo: 1234567890"
                  size="small"
                />
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel id="pais-label">País</InputLabel>
                  <Select labelId="pais-label" id="pais">
                    <MenuItem value="">Seleccione un país</MenuItem>
                    <MenuItem value="ec">Ecuador</MenuItem>
                    <MenuItem value="co">Colombia</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel id="region-label">Región</InputLabel>
                  <Select labelId="region-label" id="region">
                    <MenuItem value="">Seleccione una región</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  id="ciudad"
                  label="Ciudad"
                  placeholder="Ejemplo: Guayaquil"
                  size="small"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="direccion"
                  label="Dirección"
                  placeholder="Ejemplo: Av. Principal 123"
                  size="small"
                  multiline
                />
              </Box>
            )}

            {step === 2 && (
              <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  Datos del Usuario
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  id="nombre-usuario"
                  label="Nombre del Usuario (Encargado)"
                  placeholder="Ejemplo: Juan Pérez"
                  size="small"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="email-usuario"
                  label="Correo Electrónico"
                  placeholder="Ejemplo: usuario@correo.com"
                  size="small"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="password"
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  size="small"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="confirm-password"
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Repita su contraseña"
                  size="small"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="telefono"
                  label="Teléfono"
                  placeholder="Ejemplo: +593 987654321"
                  size="small"
                />
              </Box>
            )}

            {step === 3 && (
              <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  Plan de Suscripción
                </Typography>
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel id="plan-label">Plan</InputLabel>
                  <Select labelId="plan-label" id="plan">
                    <MenuItem value="">Seleccione un plan</MenuItem>
                    <MenuItem value="basic">Básico</MenuItem>
                    <MenuItem value="standard">Estándar</MenuItem>
                    <MenuItem value="premium">Premium</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Grid container justifyContent="space-between" mt={3}>
              {step > 1 && (
                <Button variant="contained" onClick={prevStep}>
                  Atrás
                </Button>
              )}
              {step < 3 ? (
                <Button variant="contained" color="primary" onClick={nextStep}>
                  Siguiente
                </Button>
              ) : (
                <Button variant="contained" color="success" type="submit">
                  Registrar
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid
            size={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "teal",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
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
                align="center"
                color="white"
                gutterBottom
              >
                Administra tu urbanización y seguridad de manera eficiente con
                nuestro plan básico. Disfruta de beneficios como la construcción
                de presupuestos, sincronización con bancos y categorización
                automática.
              </Typography>
              <Link href="/" style={{ textDecoration: "underline" }}>
                <Button variant="text" color="inherit">
                  Ver más información
                </Button>
              </Link>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                pt={10}
              >
                <FaHome
                  style={{ color: "white", width: "1.5rem", height: "1.5rem" }}
                />
                <Typography fontWeight="bold" variant="h6" color="white">
                  Urbanoacceso
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <hr className="my-6" />
        <Typography variant="body2" align="center" color="textSecondary">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/signin" passHref>
            <Button variant="text" color="primary">
              Inicia sesión
            </Button>
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignupPage;
