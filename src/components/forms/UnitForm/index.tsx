"use client";
import React, { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LuCirclePlus, LuTrash } from "react-icons/lu";

import { useUnitApi } from "@/hooks/useUnitApi";
import { schema } from "./validation";
import { Unit } from "@/types/unit";
import { useResidentApi } from "@/hooks/useResidentApi";

const UnitForm: FC<{ id?: string }> = ({ id }) => {
  const { saveUnit, updateUnit, fetchUnit } = useUnitApi();
  const { residents, fetchResidents } = useResidentApi();

  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Unit>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "",
      name: "",
      owner: null,
      residents: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "residents",
  });

  const loadData = async () => {
    try {
      if (!id) return;
      const currentUnit = await fetchUnit(id);

      if (currentUnit) {
        reset(currentUnit);
        setModeEdit(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const loadResidents = async () => {
    try {
      await fetchResidents();
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  useEffect(() => {
    loadResidents();
  }, []);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const onSubmit = async (data: Unit) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateUnit(id, data);
      } else {
        await saveUnit(data);
      }

      Swal.fire({
        title: "Aviso",
        text: "Registro actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/management/units");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar la unidad",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={1} sx={{ width: "100%" }}>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="select-type">Tipo</InputLabel>
                  <Select
                    labelId="select-type"
                    id="demo-simple-select"
                    label="Age"
                    {...field}
                  >
                    <MenuItem value={"house"}>Casa</MenuItem>
                    <MenuItem value={"apartment"}>Departamento</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  fullWidth
                  label="Unidad"
                  placeholder="Ejemplo: ED1"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  size="small"
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12 }}>
          {fields.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Controller
                name={`residents.${index}.resident`}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disablePortal
                    options={residents}
                    getOptionLabel={(option) => option?._id}
                    renderInput={(params) => (
                      <TextField {...params} label="Residente" />
                    )}
                    size="small"
                    fullWidth
                    onChange={(_, value) => field.onChange(value)}
                    value={
                      residents.find(
                        (resident) => resident?._id === field.value
                      ) || null
                    }
                  />
                )}
              />
              <IconButton onClick={() => remove(index)} color="error">
                <LuTrash />
              </IconButton>
            </Box>
          ))}
          <Button
            type="button"
            variant="text"
            color="secondary"
            onClick={() =>
              append({
                resident: "",
              })
            }
            sx={{ textTransform: "none" }}
            startIcon={<LuCirclePlus />}
          >
            Agregar Residente
          </Button>
        </Grid2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 2,
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UnitForm;
