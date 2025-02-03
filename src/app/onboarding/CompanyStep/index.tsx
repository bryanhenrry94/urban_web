import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import BuildHomeSVG from "@/assets/images/undraw_build-your-home_5opd.svg";

const CompanyStep = () => {
  const {
    register,
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
        <TextField
          {...register("companyName")}
          margin="dense"
          required
          fullWidth
          id="companyName"
          label="Nombre de la Urbanización"
          placeholder="Ejemplo: Urbanización Los Jardines"
          name="companyName"
          type="text"
          autoComplete="companyName"
          autoFocus
          error={!!errors.companyName}
          helperText={errors.companyName?.message?.toString()}
          size="small"
        />
        <TextField
          {...register("identification")}
          margin="dense"
          required
          fullWidth
          id="identification"
          label="ID Fiscal"
          placeholder="Ejemplo: 1234567890"
          name="identification"
          type="text"
          autoComplete="identification"
          error={!!errors.identification}
          helperText={errors.identification?.message?.toString()}
          size="small"
        />
        <TextField
          {...register("address")}
          margin="dense"
          required
          fullWidth
          id="address"
          label="Dirección"
          placeholder="Ejemplo: Av. Principal 123"
          name="address"
          type="text"
          autoComplete="address"
          error={!!errors.address}
          helperText={errors.address?.message?.toString()}
          size="small"
        />
      </Box>
    </Container>
  );
};

export default CompanyStep;
