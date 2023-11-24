import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const blue ='#15A4C1'
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary:{
      main:blue
    },
    background:{
      main:grey[300],
      standOut:'#ffffff',
    },
    text:{
      main:'#000000',
      contrast:'#ffffff'
    }
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:blue
    },
    background:{
      main:'#1C1F26',
      standOut:'#16181D',
    },
    text:{
      main:'#ffffff',
      contrast:'#ffffff'
    }
  },
});

export { lightTheme, darkTheme };
