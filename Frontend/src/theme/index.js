import { createTheme } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary:{
      main:blue[900]
    },
    background:{
      main:grey[300],
      standOut:'#ffffff',
    }
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:blue[900]
    },
    background:{
      main:'#101418',
      standOut:'#0a0d0f',
    }
  },
});

export { lightTheme, darkTheme };
