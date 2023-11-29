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
  components: {
    MuiIconButton:{
      styleOverrides:{
        root:{
          aspectRatio:'1/1'
        }
      }
    },
    MuiTooltip:{
      styleOverrides:{
        tooltip:{
          color:'#000000',
          fontSize:'15px',
          fontWeight:600,
          backgroundColor:grey[300],
          padding:'10px',
          margin:'20px'
        },
        popper: {
          marginLeft: '12px !important', 
        },
      }
    }
  },
  shape:{
    borderRadius:20
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
      main:'#8A94A8',
      dark:'#576175',
      contrast:'#ffffff'
    }
  },
  components: {
    MuiIconButton:{
      styleOverrides:{
        root:{
          aspectRatio:'1/1'
        }
      }
    },
    MuiTooltip:{
      styleOverrides:{
        tooltip:{
          color:'#8A94A8',
          fontSize:'15px',
          fontWeight:600,
          backgroundColor:'#1C1F26',
          padding:'10px',
          margin:'20px'
        },
        popper: {
          marginLeft: '12px !important', 
        },
      }
    }
  },
  shape:{
    borderRadius:20
  },
});

export { lightTheme, darkTheme };
