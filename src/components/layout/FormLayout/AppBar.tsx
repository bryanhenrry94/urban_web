import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useFormLayout } from '@/hooks';
import { useAppStore } from '@/store';

function AppBarComponent() {
  const onSwitchFormLayout = useFormLayout();
  const [state] = useAppStore();
  const urlActual = window.location.href;
  const urlId = urlActual.split('/').pop();
  const [url, setUrl] = React.useState(`http://localhost:3000/form/${urlId}`);  // Estado para almacenar la URL

  // Función para abrir la URL en una nueva ventana
  const handleOpenUrl = () => {
    if (url) {
      window.open(url, '_blank');  // Abre la URL en una nueva ventana
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {state.formLayout ? (
            <TextField
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              // label="Ingrese URL"
              variant="outlined"
              color='secondary'
              size="small"
              sx={{ ml: 2, width: 480, backgroundColor: 'white', borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleOpenUrl} edge="end">
                    <OpenInNewIcon />
                  </IconButton>
                ),
              }}
            />
          ) : (
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/dazzform/forms"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Formularios
            </Typography>
          )}


          {/* Componente de Input para URL con botón al final */}


          <FormControlLabel
            sx={{ marginLeft: 'auto' }}
            control={
              <Switch
                checked={state.formLayout}
                onChange={() => {
                  onSwitchFormLayout(!state.formLayout);
                }}
                color='secondary'
                name="formLayoutSwitch"
              />
            }
            label="Vista Previa"
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppBarComponent;
