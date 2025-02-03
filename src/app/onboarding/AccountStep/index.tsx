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
import { useFormContext } from "react-hook-form";
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
            <TextField
              {...register("name")}
              margin="dense"
              required
              fullWidth
              id="name"
              label="Nombres"
              placeholder="Ejemplo: Juan"
              name="name"
              type="text"
              autoFocus
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message?.toString()}
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <TextField
              {...register("surname")}
              margin="dense"
              required
              fullWidth
              id="surname"
              label="Apellidos"
              placeholder="Ejemplo: Pérez"
              name="surname"
              type="text"
              autoComplete="surname"
              error={!!errors.surname}
              helperText={errors.surname?.message?.toString()}
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <TextField
              {...register("email")}
              margin="dense"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              placeholder="Ejemplo: joseperez@gmail.com"
              name="email"
              type="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <FormControl size="small" fullWidth margin="dense">
              <InputLabel id="demo-select-small-label">
                País de Residencia
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="País de Residencia"
                required
                {...register("country")}
                onChange={(event) => {
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
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6 }}>
            <TextField
              {...register("phone")}
              margin="dense"
              fullWidth
              id="phone"
              label="Teléfono de Contacto"
              placeholder="999999999"
              name="phone"
              type="text"
              autoComplete="phone"
              error={!!errors.phone}
              helperText={errors.phone?.message?.toString()}
              size="small"
              required
              slotProps={{
                input: {
                  startAdornment: currentCountry && (
                    <InputAdornment position="start">
                      {currentCountry.icon}
                      <span style={{ marginLeft: 8, fontSize: 12 }}>
                        {currentCountry.codePhone}
                      </span>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("password")}
              margin="dense"
              required
              fullWidth
              id="password"
              label="Contraseña"
              placeholder="*********"
              name="password"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("confirmPassword")}
              margin="dense"
              required
              fullWidth
              id="confirmPassword"
              label="Confirmar Contraseña"
              placeholder="*********"
              name="confirmPassword"
              autoComplete="confirmPassword"
              type={showPasswordConfirm ? "text" : "password"}
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
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default AccountStep;
