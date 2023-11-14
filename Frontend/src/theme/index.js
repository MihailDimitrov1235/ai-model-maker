import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary:{
        main:blue[900]
    }
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
        main:green[900]
    }
  },
});

export { lightTheme, darkTheme };
