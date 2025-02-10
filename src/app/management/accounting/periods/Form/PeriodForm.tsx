import React, { useEffect } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// react-hook-form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PeriodSchema } from "@/validations";
import { useAccountingPeriodsContext } from "@/contexts/AccountingPeriodsContext";
import { IAccountingPeriod } from "@/types";

interface FormProps {
  handleCancel: () => void;
}

const PeriodForm: React.FC<FormProps> = ({ handleCancel }) => {
  const { handleSave, rowSelected, modeEdit, setModeEdit } =
    useAccountingPeriodsContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAccountingPeriod>({
    resolver: yupResolver(PeriodSchema),
    defaultValues: {
      name: "",
      start_date: dayjs().toDate(),
      end_date: dayjs().toDate(),
      status: "open",
    },
  });

  useEffect(() => {
    if (rowSelected) {
      setModeEdit(true);
      reset(rowSelected);
    } else reset();
  }, [rowSelected, control]);

  const onSubmit = (data: IAccountingPeriod) => {
    handleSave(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" textAlign={"center"}>
          {modeEdit ? "Editar Periodo" : "Nuevo Periodo"}
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
              autoFocus
            />
          )}
        />
        <Controller
          name="start_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Fecha Inicio"
              format="DD/MM/YYYY"
              value={dayjs(field.value)}
              onChange={(date) => field.onChange(date || dayjs())}
              slotProps={{ textField: { size: "small", margin: "dense" } }}
            />
          )}
        />
        <Controller
          name="end_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Fecha Fin"
              format="DD/MM/YYYY"
              value={dayjs(field.value)}
              onChange={(date) => field.onChange(date || dayjs())}
              slotProps={{ textField: { size: "small", margin: "dense" } }}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Estado"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
            >
              <MenuItem value={"open"}>Abierto</MenuItem>
              <MenuItem value={"closed"}>Cerrado</MenuItem>
            </TextField>
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
    </LocalizationProvider>
  );
};

export default PeriodForm;
