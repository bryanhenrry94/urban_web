"use client";
import React, { FC, useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { useUserApi } from "@/hooks/useUserApi";
import { usePropertyApi } from "@/hooks/usePropertyApi";
import { User } from "@/types";
import { Box, Button, Divider, MenuItem, TextField } from "@mui/material";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    email: yup.string().required("El email es requerido"),
    role: yup.string().required("El rol es requerido"),
    status: yup.string().required("El estado es requerido"),
    propertyId: yup
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .notRequired(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const UserForm: FC<{ id?: string }> = ({ id }) => {
  const { saveUser, updateUser, fetchUser } = useUserApi();
  const { properties, fetchProperties } = usePropertyApi();

  const router = useRouter();
  const [modeEdit, setModeEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const loadUser = useCallback(async () => {
    try {
      if (!id) return;
      const currentUser = await fetchUser(id);

      setModeEdit(true);

      if (currentUser) {
        setValue("name", currentUser.name);
        setValue("email", currentUser.email);
        setValue("role", currentUser.role);
        setValue("status", currentUser.status);
        setValue("propertyId", currentUser?.propertyId);
      }
    } catch (error) {
      console.error("Error fetching urbanization:", error);
    }
  }, [id, setValue]);

  const loadUrbanizations = async () => {
    try {
      // Realiza la solicitud de autenticación a tu API
      await fetchProperties();
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    loadUrbanizations();
  }, []);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id, loadUser]);

  const onSubmit = async (data: User) => {
    try {
      if (modeEdit) {
        if (!id) return;
        await updateUser(id, data);
      } else {
        // Realiza la solicitud de autenticación a tu API
        await saveUser(data);
      }

      Swal.fire({
        title: "Aviso",
        text: "Registro actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Ok",
      });
      router.push("/settings/users");
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
          borderBottom: 2,
        }}
      >
        <TextField
          id="email"
          type="email"
          {...register("email")}
          variant="outlined"
          placeholder="Correo electrónico"
          disabled={modeEdit}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin={"dense"}
          size="small"
        />
        <TextField
          id="name"
          type="text"
          {...register("name")}
          variant="outlined"
          placeholder="Nombre completo"
          error={!!errors.name}
          helperText={errors.name?.message}
          margin={"dense"}
          size="small"
        />
        <TextField
          id="role"
          select
          {...register("role")}
          variant="outlined"
          placeholder="Selecciona un rol"
          error={!!errors.role}
          helperText={errors.role?.message}
          margin={"dense"}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="user">Usuario</MenuItem>
          <MenuItem value="admin">Administrador</MenuItem>
        </TextField>
        <TextField
          id="status"
          select
          {...register("status")}
          variant="outlined"
          error={!!errors.status}
          helperText={errors.status?.message}
          margin={"dense"}
          size="small"
        >
          <MenuItem value="active">Activo</MenuItem>
          <MenuItem value="inactive">Inactivo</MenuItem>
        </TextField>
        <Divider />
        <TextField
          id="propertyId"
          select
          {...register("propertyId")}
          variant="outlined"
          error={!!errors.propertyId}
          helperText={errors.propertyId?.message}
          margin={"dense"}
          size="small"
        >
          <MenuItem value="">N/A</MenuItem>
          {properties &&
            properties.map((property) => (
              <MenuItem key={property._id} value={property._id}>
                {property.urbanizationId?.name} - {property.unitNumber}
              </MenuItem>
            ))}
        </TextField>

        <Box sx={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ py: 2, px: 4 }}
          >
            {modeEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default UserForm;
