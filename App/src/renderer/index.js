import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, useRoutes, useLocation, createHashRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import routes from "./routes";
import {useMediaQuery} from "@mui/material";
import './i18n';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  // const location = useLocation()
  // console.log(location)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode? "dark" : "light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () => (mode == "light" ? lightTheme : darkTheme),
    [mode]
  );

  const router = createHashRouter(routes);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '*::-webkit-scrollbar': {
              margin:'1px',
              width: '0.4em',
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(127,127,127,.15)',
              borderRadius: '10px',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'rgba(127,127,127,.2)',
            },
            "*": {
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
              fontFamily: 'Noto Sans Display, sans-serif'
            },
            html: {
              height: "100%",
              width: "100%",
            },
            body: {
              height: "100%",
              width: "100%",
            },
            a: {
              textDecoration: "none",
            },
          }}
        />
        <div style={{ height:'100vh', width:'100vw', overflowX:'hidden'}}>
          <RouterProvider router={router}/>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
