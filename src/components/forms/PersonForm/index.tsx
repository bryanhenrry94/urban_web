"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { usePersonApi } from "@/hooks/usePersonApi";

import { schema } from "./validations";
import { IPerson } from "@/types";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PersonForm: FC<{ id?: string }> = ({ id }) => {
  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);
  const { savePerson, updatePerson, fetchPerson } = usePersonApi();

  const [roleName, setRoleName] = React.useState<string[]>([]);

  const roles = [
    {
      name: "owner",
      description: "Propietario",
    },
    {
      name: "resident",
      description: "Residente",
    },
    {
      name: "visitor",
      description: "Visitante",
    },
    {
      name: "security",
      description: "Seguridad",
    },
    {
      name: "client",
      description: "Cliente",
    },
    {
      name: "supplier",
      description: "Proveedor",
    },
    {
      name: "employee",
      description: "Empleado",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IPerson>({
    resolver: yupResolver(schema),
  });

  const loadUser = useCallback(async () => {
    try {
      if (!id) return;
      const currentPerson = await fetchPerson(id);

      if (currentPerson) {
        reset(currentPerson);
        setModeEdit(true);
      }
    } catch (error: Error | any) {
      Swal.fire({ title: "Aviso", text: error.message, icon: "error" });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: IPerson) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updatePerson(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await savePerson(data);
      }

      Swal.fire({
        title: "Aviso",
        text: `Persona ${modeEdit ? "actualizado" : "guardado"} correctamente`,
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/management/persons");
    } catch (error: Error | any) {
      Swal.fire({
        title: "Aviso",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="small" error={!!errors.type}>
            <InputLabel id="type-label">Tipo</InputLabel>
            <Controller
              name="type"
              control={control}
              defaultValue="natural"
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="type-label"
                  label="Tipo"
                  error={!!errors.type}
                  disabled={modeEdit ? true : false}
                >
                  <MenuItem value="natural">Persona Natural</MenuItem>
                  <MenuItem value="juridica">Persona Jurídica</MenuItem>
                </Select>
              )}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.type?.message?.toString()}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="numberId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                fullWidth
                label="Número de identificación"
                placeholder="Número de identificación"
                error={!!errors.numberId}
                helperText={errors.numberId?.message}
                size="small"
                disabled={modeEdit ? true : false}
              />
            )}
          />
        </Grid2>
        {watch("type") === "natural" && (
          <>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    fullWidth
                    label="Nombres"
                    placeholder="Ejemplo: Juan"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    size="small"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="surname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    fullWidth
                    label="Apellidos"
                    placeholder="Ejemplo: Perez"
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                    size="small"
                  />
                )}
              />
            </Grid2>
          </>
        )}
        {watch("type") === "juridica" && (
          <>
            <Grid2 size={{ xs: 12, sm: 12 }}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    fullWidth
                    label="Razon Social"
                    placeholder="Razon Social"
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                    size="small"
                  />
                )}
              />
            </Grid2>
          </>
        )}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                fullWidth
                label="Correo"
                placeholder="Correo"
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                fullWidth
                label="Teléfono"
                placeholder="Teléfono"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                size="small"
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12 }}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                fullWidth
                label="Dirección"
                placeholder="Dirección"
                error={!!errors.address}
                helperText={errors.address?.message}
                size="small"
                multiline
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="roles"
            control={control}
            render={({ field: { onChange, value = [] } }) => (
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  error={!!errors.roles}
                  multiple
                  value={value || []} // Evita errores si `value` es `undefined`
                  onChange={(event) => {
                    onChange(event.target.value); // Asegura que el `value` se actualice correctamente
                    // handleRoleChange();
                  }}
                  input={<OutlinedInput label="Roles" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {roles.map((rol) => (
                    <MenuItem key={rol.name} value={rol.name}>
                      <Checkbox checked={value.includes(rol.name)} />
                      <ListItemText primary={rol.description} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.roles && (
                  <FormHelperText sx={{ color: "red" }}>
                    {String(errors.roles?.message || "")}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid2>
      </Grid2>

      <Box sx={{ display: "flex", width: "100%" }}>
        <Button type="submit" variant="contained" color="primary">
          {modeEdit ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
};

export default PersonForm;
