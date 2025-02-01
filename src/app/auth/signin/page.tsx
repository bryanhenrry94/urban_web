import Link from "next/link";
import Image from "next/image";
import BestPlaceImage from "@/assets/images/undraw_best-place_dhzp.svg";
import { FaHome } from "react-icons/fa";
import LoginForm from "@/components/forms/LoginForm";
import AppLogo from "@/components/ui/AppLogo";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

const SigninPage = () => {
  return (
    <Grid container height="100vh" bgcolor="grey.100">
      <Grid
        size={6}
        bgcolor="teal"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { xs: "none", lg: "flex" },
        }}
      >
        <Box
          textAlign="center"
          color="white"
          p={2}
          sx={{ xs: "none", lg: "flex" }}
        >
          <Typography variant="h4" fontWeight="bold">
            Una administración centralizada
          </Typography>
          <Image
            src={BestPlaceImage}
            alt="Imagen"
            style={{ width: "100%", height: "15rem" }}
            width={200}
            height={200}
          />
          <Typography p={2}>
            Administra tu urbanización de manera eficiente, construye
            presupuestos, sincroniza con tus bancos y disfruta de la
            categorización automática.
          </Typography>
          <Link href="/" passHref legacyBehavior>
            <Button
              color="inherit"
              sx={{
                textDecoration: "underline",
                p: 2,
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Aprende más sobre UrbanoAcceso
            </Button>
          </Link>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            pt={10}
          >
            <FaHome
              style={{ color: "white", width: "1.5rem", height: "1.5rem" }}
            />
            <Typography fontWeight="bold" variant="h6">
              Urbanoacceso
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        size={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "180%", lg: "50%" },
        }}
      >
        <Container
          component={Paper}
          maxWidth="sm"
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <AppLogo />
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="textPrimary"
          >
            Inicio de Sesión
          </Typography>
          <Typography variant="body2" fontWeight="medium" color="textSecondary">
            Todavia no tienes una cuenta?{" "}
            <Link href="/auth/signup" passHref legacyBehavior>
              <Button color="primary" sx={{ textDecoration: "underline" }}>
                Registrate
              </Button>
            </Link>
          </Typography>
          <LoginForm />
          <Link color="primary" href={"/auth/forgot-password"}>
            Olvidaste tu Contraseña?
          </Link>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SigninPage;
