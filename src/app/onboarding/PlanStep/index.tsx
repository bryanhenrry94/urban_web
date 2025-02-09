import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  Modal,
} from "@mui/material";
import { LuCheck } from "react-icons/lu";
import { useFormContext, Controller } from "react-hook-form";
import Image from "next/image";
import CreditCardSVG from "@/assets/images/undraw_credit-card_t6qm.svg";

interface Plan {
  code: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  duration: string;
  available: boolean;
  trial_period: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

const PlanStep = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const plans: Plan[] = [
    {
      code: "essential",
      name: "Essential Plan",
      price: 9.99,
      currency: "USD",
      features: [
        "Gestión de hasta 10 propiedades",
        "Acceso a panel de administración básico",
        "Notificaciones a residentes",
        "Soporte técnico limitado",
        "Reportes mensuales básicos",
      ],
      duration: "mensual",
      available: true,
      trial_period: "14 días",
    },
    {
      code: "advanced",
      name: "Advanced Plan",
      price: 19.99,
      currency: "USD",
      features: [
        "Gestión de hasta 50 propiedades",
        "Panel de administración avanzado",
        "Notificaciones personalizadas a residentes",
        "Soporte técnico prioritario",
        "Reportes detallados (mensuales y anuales)",
        "Gestión de incidencias y solicitudes de mantenimiento",
        "Integración con sistema de pagos de cuotas",
      ],
      duration: "mensual",
      available: true,
      trial_period: "30 días",
    },
    {
      code: "enterprise",
      name: "Enterprise Plan",
      price: 29.99,
      currency: "USD",
      features: [
        "Gestión ilimitada de propiedades",
        "Panel de administración avanzado con múltiples usuarios",
        "Notificaciones y alertas avanzadas a residentes",
        "Soporte técnico 24/7",
        "Reportes detallados y personalizables",
        "Gestión de incidencias, solicitudes de mantenimiento y pagos",
        "Integración con sistemas de administración de condominios",
        "Acceso a herramientas de análisis y estadísticas",
        "Configuración de alertas de seguridad",
      ],
      duration: "mensual",
      available: true,
      trial_period: "30 días",
    },
  ];

  const handleSelectedPlan = (event: SelectChangeEvent<string>) => {
    const selectedPlanName = event.target.value as string;
    const plan = plans.find((plan) => plan.code === selectedPlanName);
    setSelectedPlan(plan || null);
  };

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Box textAlign={"center"}>
        <Image
          src={CreditCardSVG}
          alt="Personal Information"
          width={100}
          height={100}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", m: 2 }}
        >
          ¿Qué plan necesitas?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
        <FormControl size="small" fullWidth margin="normal">
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="select-plan">Plan</InputLabel>
                <Select
                  labelId="select-plan"
                  id="demo-simple-select"
                  label="Plan"
                  {...field}
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectedPlan(e);
                  }}
                  error={!!errors.plan}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {plans.map((plan) => (
                    <MenuItem key={plan.name} value={plan.code}>
                      {plan.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </FormControl>

        {selectedPlan && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: "200px",
              overflowY: "scroll",
              mt: 2,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                mb: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {selectedPlan.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: "bold", mr: 1 }}
                >
                  {selectedPlan.currency}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", mr: 1 }}
                >
                  {selectedPlan.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  / {selectedPlan.duration}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                Período de prueba: {selectedPlan.trial_period}
              </Typography>

              <Box textAlign={"center"}>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={handleOpen}
                >
                  Ver detalles
                </Button>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <List dense>
                    {selectedPlan.features.map((feature, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LuCheck />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Box textAlign={"center"}>
                    <Button
                      variant="text"
                      color="primary"
                      sx={{ textTransform: "none" }}
                      onClick={handleClose}
                    >
                      Cerrar
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PlanStep;
