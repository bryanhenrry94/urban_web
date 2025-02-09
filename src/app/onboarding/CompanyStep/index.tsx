import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import Image from "next/image";
import BuildHomeSVG from "@/assets/images/undraw_build-your-home_5opd.svg";

const CompanyStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Box textAlign={"center"}>
        <Image
          src={BuildHomeSVG}
          alt="Personal Information"
          width={100}
          height={100}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", m: 2 }}
        >
          ¿Cómo se llama la urbanización?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              required
              fullWidth
              id="companyName"
              label="Nombre de la Urbanización"
              placeholder="Ejemplo: Urbanización Los Jardines"
              type="text"
              autoComplete="companyName"
              autoFocus
              error={!!errors.companyName}
              helperText={errors.companyName?.message?.toString()}
              size="small"
            />
          )}
        />
        <Controller
          name="taxId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              required
              fullWidth
              id="taxId"
              label="ID Fiscal"
              placeholder="Ejemplo: 1234567890"
              type="text"
              autoComplete="taxId"
              error={!!errors.taxId}
              helperText={errors.taxId?.message?.toString()}
              size="small"
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              required
              fullWidth
              id="address"
              label="Dirección"
              placeholder="Ejemplo: Av. Principal 123"
              type="text"
              autoComplete="address"
              error={!!errors.address}
              helperText={errors.address?.message?.toString()}
              size="small"
            />
          )}
        />
      </Box>
    </Container>
  );
};

export default CompanyStep;
