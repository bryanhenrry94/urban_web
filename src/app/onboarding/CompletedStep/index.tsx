import React from "react";
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CompleteStepSVG from "@/assets/images/undraw_well-done_kqud.svg";

const Completed = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          ¡Bien hecho!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Hemos completado el proceso de registro.
        </Typography>
        <Image
          src={CompleteStepSVG}
          alt="Building Page"
          width={200}
          height={200}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, textTransform: "none" }}
          onClick={() => router.push("/auth/signin")}
        >
          Iniciar sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Completed;
