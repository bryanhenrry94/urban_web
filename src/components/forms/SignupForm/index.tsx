"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "@/services/authService";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { TextField, Button, Box, Typography, Divider } from "@mui/material";
import { FaGoogle } from "react-icons/fa";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await signup(data);

      console.log("response: ", response);

      if (response.status === "error") {
        throw new Error(response.message);
      }

      setIsSubmitting(false);

      await Swal.fire({
        title: "Aviso",
        text: "Registro exitoso",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });

      navigate.push("/auth/signin");
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof AxiosError) {
        return Swal.fire(
          "Error",
          error.response?.data.message || "Unknown Axios error",
          "error"
        );
      }

      if (error instanceof Error) {
        return Swal.fire("Error", error.message, "error");
      }

      return Swal.fire("Error", "Error during signup", "error");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6">Información de Acceso</Typography>
      <TextField
        label="Nombre"
        {...register("name", { required: "Nombre es requerido" })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        size="small"
      />
      <TextField
        label="Correo Electrónico"
        type="email"
        {...register("email", {
          required: "Correo Electrónico es requerido",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        size="small"
      />
      <TextField
        label="Contraseña"
        type="password"
        {...register("password", {
          required: "Contraseña es requerida",
          minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </Button>
      <Divider sx={{ width: "100%" }}>o</Divider>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<FaGoogle />}
        size="medium"
      >
        Continuar con Google
      </Button>
    </Box>
  );
};

export default SignupForm;
