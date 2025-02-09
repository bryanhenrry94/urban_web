import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CostCenterSchema } from "@/validations";
import { useChartOfAccountsContext } from "@/contexts/CostCentersContext";
import { CostCenters } from "@/types/costCenters";

interface FormProps {
  handleCancel: () => void;
}

const FormCostCenter: React.FC<FormProps> = ({ handleCancel }) => {
  const { handleSave, costCenterSelected } = useChartOfAccountsContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CostCenters>({
    resolver: yupResolver(CostCenterSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (costCenterSelected) {
      const { name, description } = costCenterSelected;

      reset({ name, description });
    } else reset();
  }, [costCenterSelected, control]);

  const onSubmit = (data: CostCenters) => {
    handleSave(data);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" textAlign={"center"}>
        Centro de Costo
      </Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            variant="outlined"
            margin="dense"
            fullWidth
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descripción"
            variant="outlined"
            margin="dense"
            fullWidth
            size="small"
            error={!!errors.description}
            helperText={errors.description?.message?.toString()}
          />
        )}
      />
      <Box display="flex" justifyContent="center" mt={2} gap={2}>
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default FormCostCenter;
