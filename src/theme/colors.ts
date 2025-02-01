import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material';

const COLOR_PRIMARY: SimplePaletteColorOptions = {
  main: '#14b8a6', // teal-500 in TailwindCSS
  contrastText: '#fff',
  light: '#5eead4', // teal-300 in TailwindCSS
  dark: '#0f766e' // teal-700 in TailwindCSS
};

const COLOR_SECONDARY: SimplePaletteColorOptions = {
  main: '#db7093',
  contrastText: '#fff',
  light: '#0197b24a',
  dark: '#c53c69',
};


const COLOR_INFO: SimplePaletteColorOptions = {
  main: '#04C4D9',
  contrastText: '#fff',
  light: '#fff',
  dark: '#268fbe',
};

const COLOR_SUCCESS: SimplePaletteColorOptions = {
  main: '#3a7b50',
  contrastText: '#fff',
  light: '#EF9A9A',
  dark: '#1b492b',
};

const COLOR_WARNING: SimplePaletteColorOptions = {
  main: '#F29F05',
  contrastText: '#fff',
  light: '#EF9A9A',
  dark: '#fc7f03',
};

const COLOR_ERROR: SimplePaletteColorOptions = {
  main: '#F24130',
  contrastText: '#fff',
  light: '#EF9A9A',
  dark: '#991818',
};

/**
 * MUI colors set to use in theme.palette
 */
export const PALETTE_COLORS: Partial<PaletteOptions> = {
  primary: COLOR_PRIMARY,
  secondary: COLOR_SECONDARY,
  error: COLOR_ERROR,
  warning: COLOR_WARNING,
  info: COLOR_INFO,
  success: COLOR_SUCCESS,
};
