import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import MyPasswordSVG from "@/assets/images/undraw_my-password_iyga.svg";
import { useFormContext } from "react-hook-form";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const ResetStep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 4,
        gap: 2,
      }}
    >
      <Image src={MyPasswordSVG} alt="Send Mail" width={100} height={100} />
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Confirmación de nueva contraseña
      </Typography>
      <Typography variant="body1">
        Por favor, confirma tu nueva contraseña.
      </Typography>
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
        autoFocus
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
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
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
    </Box>
  );
};

export default ResetStep;
