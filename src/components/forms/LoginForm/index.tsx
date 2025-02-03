"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { TextField, Button, Box } from "@mui/material";

const schema = yup
  .object({
    email: yup.string().required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (response && response.ok) {
        router.push("/secure/dashboard");
      } else {
        Swal.fire({
          title: "Aviso",
          text: response?.error || "Credenciales incorrectas",
          icon: "error",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        helperText={errors.email?.message}
        size="small"
      />
      <TextField
        {...register("password")}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        size="small"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        size="medium"
      >
        Ingresar
      </Button>
    </Box>
  );
};

export default LoginForm;
