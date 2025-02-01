"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Grid2 as Grid,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import TemplateApp from "@/assets/images/template_app.png";
import AppLogo from "@/components/ui/AppLogo";
import Link from "next/link";
import { MdOutlineFingerprint } from "react-icons/md";
import { MdOutlineKeyboardReturn } from "react-icons/md";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ForgotPasswordSVG from "@/assets/images/undraw_forgot-password_odai.svg";
import CompletedSVG from "@/assets/images/undraw_completed_0sqh.svg";

import { useUserApi } from "@/hooks/useUserApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const steps = [1, 2, 3, 4];

const ForgotPassword: FC = () => {
  const router = useRouter();

  const {
    resetPassword,
    emailRecoveryPassword,
    setEmailRecoveryPassword,
    validateCodeOTP,
    setNewPassword,
  } = useUserApi();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const FormPageOne = () => {
    const schema = yup
      .object({
        email: yup.string().required("El email es requerido"),
      })
      .required();

    type FormData = yup.InferType<typeof schema>;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
      try {
        // Setea email a recuperar contrasena
        setEmailRecoveryPassword(data.email);

        // Ejecuta api de reseteo de contrasena y envia correo con codigo OTP
        resetPassword(data.email);

        handleNext();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <Image
            src={ForgotPasswordSVG}
            alt="Send Mail"
            width={150}
            height={150}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
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
            helperText={errors.email?.message}
            size="small"
            placeholder="Ingresa tu correo electrónico"
          />
          <Button type="submit" variant="contained" fullWidth>
            Restablecer Contraseña
          </Button>
          <Link href={"/auth/signin"}>
            <Button variant="text" startIcon={<MdOutlineKeyboardReturn />}>
              Volver al Inicio de Sesión
            </Button>
          </Link>
        </Box>
      </Box>
    );
  };

  const FormPageTwo = () => {
    const schema = yup
      .object({
        code: yup.string().required(),
      })
      .required();

    type FormData = yup.InferType<typeof schema>;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
      try {
        const response = await validateCodeOTP(
          emailRecoveryPassword,
          data.code
        );

        if (!response.data) {
          await Swal.fire({
            title: "Aviso",
            text: "Codigo OTP inválido!",
            icon: "error",
            confirmButtonColor: "#22C55E",
            confirmButtonText: "Ok",
          });
          return;
        }

        handleNext();
      } catch (error) {
        console.error(error);

        await Swal.fire({
          title: "Aviso",
          text: `Error: ${error}`,
          icon: "error",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
      }
    };

    const resendCodeOTP = async () => {
      if (emailRecoveryPassword) {
        resetPassword(emailRecoveryPassword);

        await Swal.fire({
          title: "Aviso",
          text: `Codigo OTP enviado al correo ${emailRecoveryPassword}`,
          icon: "info",
          confirmButtonColor: "#22C55E",
          confirmButtonText: "Ok",
        });
      }
    };

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <MdOutlineFingerprint size={30} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Verificación de Código
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Hemos enviado un código de verificación a tu correo:{" "}
            {emailRecoveryPassword}
          </Typography>
          <TextField
            {...register("code")}
            margin="normal"
            required
            name="code"
            type="text"
            id="code"
            error={!!errors.code}
            size="small"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Verificar Código
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>¿No te ha llegado el código?</Typography>
            <Button variant="text" color="primary" onClick={resendCodeOTP}>
              Reenviar
            </Button>
          </Box>
          <Link href={"/auth/signin"}>
            <Button variant="text" startIcon={<MdOutlineKeyboardReturn />}>
              Volver al Inicio de Sesión
            </Button>
          </Link>
        </Box>
      </Box>
    );
  };

  const FormPageThree = () => {
    const schema = yup
      .object({
        password: yup
          .string()
          .required("El campo es requerido")
          .min(8, "La contraseña debe tener al menos 8 caracteres.")
          .matches(
            /[A-Z]/,
            "La contraseña debe incluir al menos una letra mayúscula."
          )
          .matches(
            /[a-z]/,
            "La contraseña debe incluir al menos una letra minúscula."
          )
          .matches(/[0-9]/, "La contraseña debe incluir al menos un número.")
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "La contraseña debe incluir al menos un carácter especial (!@#$%^&*, etc.)."
          )
          .matches(
            /^(?!.*(\w)\1{2,}).*$/,
            "La contraseña no debe contener caracteres repetidos consecutivamente."
          ),
        confirmPassword: yup
          .string()
          .required("El campo es requerido")
          .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
      })
      .required();

    type FormData = yup.InferType<typeof schema>;

    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
      try {
        const response = await setNewPassword(
          emailRecoveryPassword,
          data.password
        );

        console.log("response: ", response);

        if (response?.data) {
          handleNext();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const validatePasswordMatch = (value: string) => {
      return (
        value === getValues("confirmPassword") || "Las contraseñas no coinciden"
      );
    };

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            p: 4,
            gap: 1,
          }}
        >
          <MdOutlineFingerprint size={30} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Establece la nueva contraseña
          </Typography>
          <Typography variant="body2" color="textSecondary">
            La contraseña debe tener al menos 8 caracteres, incluir al menos una
            letra mayúscula, una letra minúscula, un número, un carácter
            especial (!@#$%^&*, etc.), y no debe contener caracteres repetidos
            consecutivamente.
          </Typography>
          <TextField
            {...register("password")}
            margin="normal"
            required
            label="Contraseña"
            placeholder="Ingresar contraseña"
            name="password"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            size="small"
          />
          <TextField
            {...register("confirmPassword", {
              validate: validatePasswordMatch,
            })}
            margin="normal"
            required
            label="Confirmar Contraseña"
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            size="small"
          />

          <Button type="submit" variant="contained" fullWidth>
            Resetear Contraseña
          </Button>
          <Link href={"/auth/signin"}>
            <Button variant="text" startIcon={<MdOutlineKeyboardReturn />}>
              Volver al Inicio de Sesión
            </Button>
          </Link>
        </Box>
      </Box>
    );
  };

  const FormPageFour = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 4,
          gap: 1,
        }}
      >
        <Image
          src={CompletedSVG}
          alt="Send Mail"
          width={150}
          height={150}
          style={{ margin: 16 }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          ¡Todo listo!
        </Typography>
        <Typography variant="subtitle2">
          Tu contraseña ha sido restablecida con éxito!
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => router.push("/auth/signin")}
        >
          Inicio de Sesión
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      <Grid container>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100vh",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 4 }}
            >
              <AppLogo />
              <Link href={"/auth/signup"} color="primary">
                Crear Cuenta
              </Link>
            </Box>
            {activeStep === 0 && (
              <React.Fragment>
                <FormPageOne />
              </React.Fragment>
            )}
            {activeStep === 1 && (
              <React.Fragment>
                <FormPageTwo />
              </React.Fragment>
            )}
            {activeStep === 2 && (
              <React.Fragment>
                <FormPageThree />
              </React.Fragment>
            )}
            {activeStep === 3 && (
              <React.Fragment>
                <FormPageFour />
              </React.Fragment>
            )}

            <Box sx={{ width: "100%", p: 4 }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleNext} />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Grid>
        <Grid size={8} sx={{ display: { xs: "none", sm: "block" } }}>
          <Box
            sx={{
              bgcolor: "#eef2f6",
              height: "100vh",
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              pt: 8,
              pl: 8,
              pb: 8,
            }}
          >
            <Image
              src={TemplateApp}
              alt="Template App"
              width={1000}
              height={600}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;
