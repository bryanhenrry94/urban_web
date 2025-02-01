import { ThemeOptions } from '@mui/material';
import { PALETTE_COLORS } from './colors';
import { APP_BORDER_RADIUS } from '@/components/config';

/**
 * MUI theme options for "Light Mode"
 */
export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      paper: '#ffff',
      default: '#ffff',
    },
    text: {
      primary: '#000',
      secondary: '',
    },
    ...PALETTE_COLORS,
  },
  shape: {
    borderRadius: APP_BORDER_RADIUS
  },
};

export default LIGHT_THEME;
