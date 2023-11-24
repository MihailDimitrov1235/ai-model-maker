import { Box, Button,  Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DatasetIcon from "@mui/icons-material/Dataset";
import ScienceIcon from "@mui/icons-material/Science";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  const items = [
    { type: "item", name: "Home", icon: HomeIcon, href: "/" },
    { type: "item", name: "Data", icon: DatasetIcon, href: "/data" },
    { type: "item", name: "Train", icon: SchoolIcon, href: "/train" },
    { type: "item", name: "Test", icon: ScienceIcon, href: "/test" },
  ];
  const isActive = false;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        bgcolor: "background.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "270px",
          bgcolor: "background.standOut",
          m: 2,
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
          }}
        >
          <img
            src="logo-placeholder-image.png"
            style={{ aspectRatio: "1/1", height: "64px" }}
          />
          <Typography variant="h6">AI-MODEL-MAKER</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowX: "hidden",
          }}
        >
          <SidebarMenu items={items} />
        </Box>

        <Box>
          <ThemeToggle />
        </Box>
         
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "2",
          bgcolor: "background.standOut",
          m: 2,
          ml: 0,
          borderRadius: "10px",
          py: 1,
          px: 2,
        }}
      >
        <Outlet />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "0.5",
          bgcolor: "background.standOut",
          m: 2,
          ml: 0,
          borderRadius: "10px",
          fontWeight: 'fontWeightLight',
          py: 1,
          px: 2,
        }}
      >
        <p sx={{
            p: 2,
            width: 20 ,
        }}>
          <Typography sx={{ color: isActive?"text.contrast" : "text.main", fontSize: "16px", fontWeight:500 }}>
            Това е показно за input:
          </Typography>
          
        </p>
        <Button

          sx={{
            bgcolor:"primary.main",
            color: "Black",
            m:4,
          }}
        >
          ON/OFF
        </Button>
      </Box>
    </Box>
  );
}
