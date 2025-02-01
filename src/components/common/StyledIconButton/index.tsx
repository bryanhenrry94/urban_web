import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';

// Estiliza el IconButton
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light, // Color de fondo
  color: theme.palette.primary.contrastText,  // Color del icono
  borderRadius: '8px',  // Bordes redondeados para un efecto de "cuadrado"
//   padding: theme.spacing(1),  // Espaciado interno
  '&:hover': {
    backgroundColor: theme.palette.primary.main,  // Color de fondo al pasar el ratón
  },
}));

// Define la interfaz para los props del componente
interface MyComponentProps extends IconButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

// Define el componente
const MyComponent: React.FC<MyComponentProps> = ({ onClick, children, ...props }) => (
  <StyledIconButton
    edge="start"
    {...props}
    onClick={onClick}
  >
    {children}
  </StyledIconButton>
);

export default MyComponent;
