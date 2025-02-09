import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ProfilePictureSVG from "@/assets/images/undraw_pic-profile_nr49.svg";
import { IUserProfile } from "@/types";

const UserProfile = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<IUserProfile>();

  const onSubmit = (data: IUserProfile) => {
    console.log(data);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        sx={{ boxShadow: 1, p: 2, borderRadius: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Image
            src={ProfilePictureSVG}
            alt="profile"
            width={100}
            height={100}
          />
          <Typography variant="caption" align="center">
            Subir/Cambiar tu Imagen de Perfil
          </Typography>
          <Button
            variant="text"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Subir Imagen
          </Button>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 8 }}
        sx={{ boxShadow: 1, p: 2, borderRadius: 2 }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default UserProfile;
