import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IUserForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserApi } from "@/hooks/useUserApi";
import Swal from "sweetalert2";
import { UserFormSchema } from "@/validations";

const UserAccount: React.FC<{ id?: string }> = ({ id }) => {
  const { saveUser, updateUser, fetchUser } = useUserApi();

  const [modeEdit, setModeEdit] = React.useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<IUserForm>({
    resolver: yupResolver(UserFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      role: "resident",
      status: "active",
    },
  });

  const onSubmit = async (data: IUserForm) => {
    try {
      console.log("user: ", data);

      if (modeEdit) {
        if (!id) return;
        await updateUser(id, data);
      } else {
        await saveUser(data);
      }

      Swal.fire({
        title: "Aviso",
        text: "Registro actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#14b8a6",
        confirmButtonText: "Ok",
      });

      // router.push("/management/users");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Aviso",
        text: "Error al guardar el usuario",
        icon: "error",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    try {
      if (!id) return;
      const currentUser = await fetchUser(id);

      if (currentUser) {
        console.log("currentUser: ", currentUser);
        reset(currentUser);
        setModeEdit(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 12, sm: 12 }}
          sx={{ boxShadow: 1, p: 2, borderRadius: 2 }}
        >
          <Grid2 container spacing={1} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, sm: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    fullWidth
                    label="Nombres"
                    placeholder="Ejemplo: Juan Pérez"
                    error={!!errors.name}
                    helperText={errors.name?.message?.toString()}
                    size="small"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    fullWidth
                    label="Correo Electrónico"
                    placeholder="Ejemplo: joseperez@gmail.com"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message?.toString()}
                    size="small"
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FormControl fullWidth size="small" error={!!errors.role}>
                <InputLabel id="role-label">Rol</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  defaultValue="resident"
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="role-label"
                      label="Rol"
                      error={!!errors.role}
                    >
                      <MenuItem value="resident">Residente</MenuItem>
                      <MenuItem value="guard">Guardia</MenuItem>
                      <MenuItem value="admin">Administrador</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.role?.message?.toString()}
                </FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FormControl fullWidth size="small" error={!!errors.status}>
                <InputLabel id="status-label">Estado</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="active"
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="status-label"
                      label="Estado"
                      error={!!errors.status}
                    >
                      <MenuItem value="active">Activo</MenuItem>
                      <MenuItem value="inactive">Inactivo</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.status?.message?.toString()}
                </FormHelperText>
              </FormControl>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 2,
          width: "100%",
        }}
      >
        <Button type="submit" variant="contained" color="primary" size="small">
          {modeEdit ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserAccount;
