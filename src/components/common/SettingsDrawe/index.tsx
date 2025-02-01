import React from "react";
import { useAppStore } from "@/store";
import {
  Stack,
  Typography,
  Box,
  Drawer,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  useEventSwitchDarkMode,
  useEventSwitchRTLMode,
  useEventSwitchSidebarExpanded,
  useEventSwitchThemeWidth,
} from "@/hooks";
import CloseIcon from "@mui/icons-material/Close";
import {
  LightMode,
  DarkMode,
  ExpandMore,
  ExpandLess,
  UnfoldLess,
  UnfoldMore,
} from "@mui/icons-material";

type SettingsDraweProps = {
  toggleDrawer?: (event: React.MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
  TRLMode: boolean;
};

const SettingsDrawer: React.FC<SettingsDraweProps> = ({
  isOpen,
  TRLMode,
  toggleDrawer,
}) => {
  const [state] = useAppStore();
  const onSwitchDarkMode = useEventSwitchDarkMode();
  const onSwitchRTLkMode = useEventSwitchRTLMode();
  const onSwitchSidebarExpanded = useEventSwitchSidebarExpanded();
  const onSwitchThemeFullWidth = useEventSwitchThemeWidth();

  const handleClickReset = () => {
    onSwitchDarkMode(false);
    onSwitchRTLkMode(false);
    onSwitchSidebarExpanded(true);
    onSwitchThemeFullWidth(true);
  };

  return (
    <>
      <Drawer
        sx={{
          zIndex: isOpen ? 1300 : "auto", // zIndex dinámico según la condición onMobile
          width: "400px", // Ancho fijo en píxeles
          flexShrink: 0, // Evita que el ancho se reduzca
          "& .MuiDrawer-paper": {
            width: "400px", // Ancho del contenido del Drawer
          },
        }}
        anchor={TRLMode ? "left" : "right"}
        open={isOpen}
        onClose={toggleDrawer}
      >
        <Box component="section" sx={{ p: 2, pb: 5, pt: 5 }}>
          <Stack
            direction="row"
            spacing={1} // Añade espacio entre los elementos si es necesario
            sx={{
              justifyContent: "space-between", // Espacio entre elementos
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Personalización del Tema
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleClickReset}
                size="small"
                variant="outlined"
                color="error"
              >
                Restablecer
              </Button>
              <IconButton onClick={toggleDrawer} aria-label="cerrar">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        <Box component="section" sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={2} // Añade espacio entre los elementos si es necesario
            sx={{
              justifyContent: "space-between", // Espacio entre elementos
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              MODO DE TEMA
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => onSwitchDarkMode(false)}
                size="large"
                variant={state.darkMode ? "outlined" : "contained"}
                color="primary"
              >
                <LightMode />
              </Button>
              <Button
                onClick={() => onSwitchDarkMode(true)}
                size="large"
                variant={!state.darkMode ? "outlined" : "contained"}
                color="primary"
              >
                <DarkMode />
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        <Box component="section" sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={2} // Añade espacio entre los elementos si es necesario
            sx={{
              justifyContent: "space-between", // Espacio entre elementos
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              ANCHO DEL TEMA
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => onSwitchThemeFullWidth(true)}
                size="large"
                variant={state.ThemeFullWidth ? "contained" : "outlined"}
                color="primary"
              >
                <ExpandMore />
              </Button>
              <Button
                onClick={() => onSwitchThemeFullWidth(false)}
                size="large"
                variant={state.ThemeFullWidth ? "outlined" : "contained"}
                color="primary"
              >
                <ExpandLess />
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        <Box component="section" sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={2} // Añade espacio entre los elementos si es necesario
            sx={{
              justifyContent: "space-between", // Espacio entre elementos
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              RTL
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => onSwitchRTLkMode(false)}
                size="large"
                variant={state.TRLMode ? "outlined" : "contained"}
                color="primary"
              >
                <UnfoldMore />
              </Button>
              <Button
                onClick={() => onSwitchRTLkMode(true)}
                size="large"
                variant={!state.TRLMode ? "outlined" : "contained"}
                color="primary"
              >
                <UnfoldLess />
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        <Box component="section" sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={2} // Añade espacio entre los elementos si es necesario
            sx={{
              justifyContent: "space-between", // Espacio entre elementos
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              MENÚ LATERAL
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => onSwitchSidebarExpanded(false)}
                size="large"
                variant={!state.SidebarExpanded ? "contained" : "outlined"}
                color="primary"
              >
                <UnfoldMore />
              </Button>
              <Button
                onClick={() => onSwitchSidebarExpanded(true)}
                size="large"
                variant={state.SidebarExpanded ? "contained" : "outlined"}
                color="primary"
              >
                <UnfoldLess />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;
