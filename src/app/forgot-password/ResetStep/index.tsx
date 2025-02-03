import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import Image from "next/image";
import ForgotPasswordSVG from "@/assets/images/undraw_forgot-password_odai.svg";
import { useFormContext } from "react-hook-form";

const ResetStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 4,
        gap: 2,
      }}
    >
      <Image src={ForgotPasswordSVG} alt="Send Mail" width={100} height={100} />
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        ¿Olvidaste tu contraseña?
      </Typography>
      <Typography variant="body1">
        No te preocupes, te enviaremos instrucciones para restablecerla.
      </Typography>
      <TextField
        {...register("email")}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message?.toString()}
        size="small"
        placeholder="Ingresa tu correo electrónico"
      />
    </Box>
  );
};

export default ResetStep;
