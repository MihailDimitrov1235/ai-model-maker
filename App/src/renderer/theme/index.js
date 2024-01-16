import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

// Color constants
const primaryMain = '#15A4C1';
const primaryDark = '#10839A';
const textContrast = '#ffffff';
const borderMain = '#4C4D51';
const lightBackgroundMain = '#E9E9E9';
const lightBackgroundStandOut = '#ffffff';
const lightTextMain = '#000000';
const lightTextDark = '#333333';
const darkBackgroundMain = '#1C1F26';
const darkBackgroundStandOut = '#16181D';
const darkTextMain = '#8A94A8';
const darkTextDark = '#576175';

// Theme variant for both light and dark modes
const createCustomTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: primaryMain,
        dark: primaryDark,
      },
      background: {
        main: mode === 'light' ? lightBackgroundMain : darkBackgroundMain,
        standOut:
          mode === 'light' ? lightBackgroundStandOut : darkBackgroundStandOut,
      },
      text: {
        main: mode === 'light' ? lightTextMain : darkTextMain,
        dark: mode === 'light' ? lightTextDark : darkTextDark,
        contrast: textContrast,
      },
      border: {
        main: borderMain,
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'contrast' },
            style: {
              backgroundColor: primaryMain,
              color: textContrast,
              ':hover': {
                backgroundColor: primaryDark,
                color: textContrast,
              },
            },
          },
          {
            props: { variant: 'contrast-inherit' },
            style: {
              backgroundColor: 'rgba(255,255,255,0.02)',
              color: 'inherit',
              ':hover': {
                filter: 'brightness(120%)',
              },
            },
          },
          {
            props: { variant: 'main' },
            style: {
              padding: '0',
              backgroundColor: '',
              color: mode === 'light' ? lightTextDark : darkTextDark,
              ':hover': {
                color: mode === 'light' ? lightTextMain : darkTextMain,
                backgroundColor: 'transparent',
              },
              '.MuiTouchRipple-root': {
                display: 'none',
              },
            },
          },
          {
            props: { variant: 'main-inherit' },
            style: {
              padding: '0',
              backgroundColor: '',
              color: 'inherit',
              ':hover': {
                filter: 'brightness(120%)',
                backgroundColor: 'transparent',
              },
              '.MuiTouchRipple-root': {
                display: 'none',
              },
            },
          },
        ],
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            aspectRatio: '1/1',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: mode === 'light' ? lightTextMain : darkTextMain,
            fontSize: '15px',
            fontWeight: 600,
            backgroundColor:
              mode === 'light' ? lightBackgroundMain : darkBackgroundMain,
            padding: '10px',
            margin: '20px',
          },
          popper: {
            marginLeft: '12px !important',
          },
        },
      },
    },
    shape: {
      borderRadius: 20,
    },
  });

// Export light and dark themes
const lightTheme = createCustomTheme('light');
const darkTheme = createCustomTheme('dark');

export { lightTheme, darkTheme };
