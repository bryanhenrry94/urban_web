import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { MdExpandMore } from "react-icons/md";
import Image from "next/image";
import ConfirmSVG from "@/assets/images/undraw_confirmation_sjm7.svg";

const ConfirmationStep = () => {
  const {
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Box textAlign={"center"}>
        <Image
          src={ConfirmSVG}
          alt="Personal Information"
          width={100}
          height={100}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", m: 2 }}
        >
          ¿Estas Listo?. Verifica tu Información
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Accordion defaultExpanded sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Datos de la Cuenta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" gutterBottom>
              <strong>Nombres:</strong>
              {`${getValues("name")} ${getValues("surname")}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Correo Electrónico:</strong> {getValues("email")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>País de Residencia:</strong> {getValues("country")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Teléfono de Contacto:</strong> {getValues("phone")}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">
              Información de la Urbanización
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" gutterBottom>
              <strong>Nombre de la Urbanización:</strong>{" "}
              {getValues("companyName")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>ID Fiscal:</strong> {getValues("identification")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Dirección:</strong> {getValues("address")}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">Información del Plan</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" gutterBottom>
              <strong>Plan:</strong> {getValues("plan")}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default ConfirmationStep;
