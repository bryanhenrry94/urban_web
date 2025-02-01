import { ThemeOptions } from '@mui/material';
import { PALETTE_COLORS } from './colors';
import { APP_BORDER_RADIUS } from '@/components/config';

/**
 * MUI theme options for "Dark Mode"
 */
export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      paper: '#14252f',
      default: '#060d12',
    },
    ...PALETTE_COLORS,
  },
  shape: {
    borderRadius: APP_BORDER_RADIUS
  },
};

export default DARK_THEME;
