import React from "react";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "..";

export default function ThemeToggle(){
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
  );
}