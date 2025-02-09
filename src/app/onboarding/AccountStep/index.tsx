import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { countries } from "./countries";
import PersonalInformationSVG from "@/assets/images/undraw_personal-information_gbtc.svg";
import Image from "next/image";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

interface Country {
  name: string;
  code: string;
  codePhone: string;
  icon: string;
}

const AccountStep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Box textAlign={"center"}>
        <Image
          src={PersonalInformationSVG}
          alt="Personal Information"
          width={100}
          height={100}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", m: 2 }}
        >
          ¿Quién será el administrador principal de la urbanización?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Grid2 container spacing={1} sx={{ width: "100%" }}>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  required
                  fullWidth
                  id="name"
                  label="Nombres"
                  placeholder="Ejemplo: Juan"
                  type="text"
                  autoFocus
                  autoComplete="name"
                  error={!!errors.name}
                  helperText={errors.name?.message?.toString()}
                  size="small"
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <Controller
              name="surname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  required
                  fullWidth
                  id="surname"
                  label="Apellidos"
                  placeholder="Ejemplo: Pérez"
                  type="text"
                  autoComplete="surname"
                  error={!!errors.surname}
                  helperText={errors.surname?.message?.toString()}
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
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  placeholder="Ejemplo: joseperez@gmail.com"
                  type="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message?.toString()}
                  size="small"
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="select-country">
                    País de Residencia
                  </InputLabel>
                  <Select
                    labelId="select-country"
                    id="demo-simple-select"
                    label="País de Residencia"
                    {...field}
                    required
                    onChange={(event) => {
                      field.onChange(event);
                      const selectedCountry = countries.find(
                        (country) => country.name === event.target.value
                      );
                      setCurrentCountry(selectedCountry || null);
                    }}
                    error={!!errors.country}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {countries.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  fullWidth
                  id="phone"
                  label="Teléfono de Contacto"
                  placeholder="999999999"
                  type="text"
                  autoComplete="phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message?.toString()}
                  size="small"
                  required
                  InputProps={{
                    startAdornment: currentCountry && (
                      <InputAdornment position="start">
                        {currentCountry.icon}
                        <span style={{ marginLeft: 8, fontSize: 12 }}>
                          {currentCountry.codePhone}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  placeholder="*********"
                  type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString()}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdOutlineVisibilityOff />
                          ) : (
                            <MdOutlineVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirmar Contraseña"
                  placeholder="*********"
                  type={showPasswordConfirm ? "text" : "password"}
                  autoComplete="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message?.toString()}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <MdOutlineVisibilityOff />
                          ) : (
                            <MdOutlineVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default AccountStep;
