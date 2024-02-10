import React from 'react';
import { Box, Button, Switch, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../..';

export default function ThemeToggle() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Button
      onClick={colorMode.toggleColorMode}
      sx={{
        m: 1,
        bgcolor: 'background.standOut',
        textTransform: 'none',
        width: '100%',
        aspectRatio: '1/1',
        minWidth: '0',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.main',
      }}
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </Button>
  );
}
