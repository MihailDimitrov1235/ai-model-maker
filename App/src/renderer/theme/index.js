import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const primaryMain = '#15A4C1'
const primaryDark = '#10839A'
const textContrast = '#ffffff'

const lightBackgroundMain = '#D1D1D1'
const lightBackgroundStandOut = '#ffffff'
const lightTextMain = '#000000'
const lightTextDark = '#333333'

const darkBackgroundMain = '#1C1F26'
const darkBackgroundStandOut = '#16181D'
const darkTextMain = '#8A94A8'
const darkTextDark = '#576175'

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary:{
      main:primaryMain,
      dark:primaryDark
    },
    background:{
      main:lightBackgroundMain,
      standOut:lightBackgroundStandOut,
    },
    text:{
      main:lightTextMain,
      dark:lightTextDark,
      contrast:textContrast
    }
  },
  components: {
    MuiButton:{
      variants: [
        {
          props: { variant: 'contrast' },
          style: {
            backgroundColor: primaryMain,
            color: textContrast,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            ':hover':{
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
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            ':hover':{
              filter: 'brightness(120%)',
            },
          },
        },
        {
          props: { variant: 'main' },
          style: {
            padding:'0',
            backgroundColor: '',
            color: lightTextDark,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            ':hover':{
              color: lightTextMain,
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
            padding:'0',
            backgroundColor: '',
            color: 'inherit',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            ':hover':{
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
          color:lightTextMain,
          fontSize:'15px',
          fontWeight:600,
          backgroundColor:lightBackgroundMain,
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
      main:primaryMain,
      dark:primaryDark
    },
    background:{
      main:darkBackgroundMain,
      standOut:darkBackgroundStandOut,
    },
    text:{
      main:darkTextMain,
      dark:darkTextDark,
      contrast:textContrast
    }
  },
  components: {
    MuiButton:{
      variants: [
        {
          props: { variant: 'contrast' },
          style: {
            backgroundColor: primaryMain,//d
            color: textContrast,
            ':hover':{
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
            ':hover':{
              filter: 'brightness(120%)',
            },
          },
        },
        {
          props: { variant: 'main' },
          style: {
            padding:'0',
            backgroundColor: '',
            color: darkTextDark,
            ':hover':{
              color: darkTextMain,
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
            padding:'0',
            backgroundColor: '',
            color: 'inherit',
            ':hover':{
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
          color:darkTextMain,
          fontSize:'15px',
          fontWeight:600,
          backgroundColor:darkBackgroundMain,
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
