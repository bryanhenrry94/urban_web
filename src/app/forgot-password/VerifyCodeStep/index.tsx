import React, { JSX } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import VerifySVG from "@/assets/images/undraw_verified_m721.svg";

const VerifyCodeStep = ({
  resendCodeOTP,
}: {
  resendCodeOTP: () => void;
}): JSX.Element => {
  const {
    register,
    getValues,
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
      <Image src={VerifySVG} alt="Send Mail" width={100} height={100} />
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Verificación de código
      </Typography>
      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
        Hemos enviado un código de verificación a tu correo:{" "}
        {getValues("email")}
      </Typography>
      <TextField
        {...register("code")}
        margin="normal"
        required
        name="code"
        type="text"
        id="code"
        error={!!errors.code}
        helperText={errors.code?.message?.toString()}
        size="small"
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>¿No te ha llegado el código?</Typography>
        <Button
          variant="text"
          color="primary"
          onClick={resendCodeOTP}
          sx={{ textTransform: "none" }}
        >
          Reenviar
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyCodeStep;
