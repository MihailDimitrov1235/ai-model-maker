import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary:{
      main:blue[500]
    },
    background:{
      main:grey[300],
      standOut:'#ffffff',
    },
    text:{
      main:'#000000'
    }
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:blue[500]
    },
    background:{
      main:'#101418',
      standOut:'#0a0d0f',
    },
    text:{
      main:'#ffffff'
    }
  },
});

export { lightTheme, darkTheme };
