"use client";
import React from "react";
import Link from "next/link";
// components
import AppLogo from "@/components/ui/AppLogo";
// mui material
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid2,
  StepContent,
} from "@mui/material";
// react-hook-form
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepSchemas } from "./validations";
// components
import { steps } from "./steps";
import AccountStep from "./AccountStep";
import CompanyStep from "./CompanyStep";
import PlanStep from "./PlanStep";
import ConfirmationStep from "./ConfirmationStep";
import CompletedStep from "./CompletedStep";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

const OnboardingWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const methods = useForm({
    resolver: yupResolver(stepSchemas[activeStep] || yup.object()), // Usa un esquema vacío si es undefined
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const isValid = await trigger(); // Dispara la validación del step actual
    if (isValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = async (data: any) => {
    try {
      console.log("Datos Finales:", data);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        data
      );
      console.log("Respuesta del servidor:", response);

      if (response.data.status === "ok") {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      let mensajeError = "";

      if (error instanceof AxiosError) {
        mensajeError = error?.response?.data?.message || "Unknown Axios error";
      } else if (error instanceof Error) {
        mensajeError = error.message;
      } else {
        mensajeError = "Algo salió mal, intentalo de nuevo";
      }

      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensajeError,
      });

      console.log(error);
      handleReset();
    }
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={4} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#eef2f6",
            height: "100vh",
            p: 4,
          }}
        >
          <AppLogo />
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ mt: 4 }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box sx={{ p: 2, width: "100%" }}>
            <Box sx={{ p: 2, display: { xs: "block", md: "none" } }}>
              <Stepper activeStep={activeStep} orientation="horizontal">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {activeStep === 0 && <AccountStep />}
              {activeStep === 1 && <CompanyStep />}
              {activeStep === 2 && <PlanStep />}
              {activeStep === 3 && <ConfirmationStep />}
              {activeStep === steps.length && <CompletedStep />}

              {activeStep < steps.length && (
                <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={
                      activeStep === 3 ? handleSubmit(onSubmit) : handleNext
                    } // Se ejecuta solo cuando el paso es 3
                    sx={{ mt: 1, mr: 1, textTransform: "none" }}
                    type="button" // Evita que el formulario se envíe automáticamente
                  >
                    {activeStep === 3 ? "Finalizar" : "Siguiente"}
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1, textTransform: "none" }}
                  >
                    Regresar
                  </Button>
                </Box>
              )}
            </Box>
          </FormProvider>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="caption" color="textSecondary" align="center">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/signin" passHref>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Inicia sesión
                </Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default OnboardingWizard;
