import React from "react";
import { Box, Button, Switch } from "@mui/material";
import { useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../..";

export default function ThemeToggle(){
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
        <Box
          sx={{
            p: 1,
            fontSize:'30px',
            display:'flex',
            alignItems:'center',
          }}
        >
          
          <Box
            sx={{
              bgcolor:'background.main',
              width: "100%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: 'space-between',
              px:3,
              py:2,
              fontSize:'16px',
              alignItems:'center'
            }}
          >
            <Box sx={{
              display: "flex",
              alignItems:'center'
            }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon style={{ fontSize:'22px', marginLeft:'-4px', marginRight:'8px'}} /> : <Brightness4Icon style={{ fontSize:'22px', marginLeft:'-4px', marginRight:'8px'}} />}
              {theme.palette.mode === 'dark' ? 'Dark ' : 'Light ' }{'theme'}
            </Box>
            <Switch
              checked={theme.palette.mode === 'dark'}
              onClick={colorMode.toggleColorMode}
            />
          </Box>
        </Box>
      // <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      //   {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      // </IconButton>
  );
}