import { Box, Button,  Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarIconMenu from "./SidebarIconMenu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DatasetIcon from "@mui/icons-material/Dataset";
import ScienceIcon from "@mui/icons-material/Science";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import LanguageChanger from "./LanguageChanger"

export default function Layout() {
  const { t } = useTranslation()
  const items = [
    { type: "item", name: t("Home"), icon: HomeIcon, href: "/" },
    { type: "item", name: t("Data"), icon: DatasetIcon, href: "/data" },
    { type: "item", name: t("Train"), icon: SchoolIcon, href: "/train" },
    { type: "item", name: t("Test"), icon: ScienceIcon, href: "/test" },
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
          width: "70px",
          bgcolor: "background.standOut",
          mx: 1,
          borderRadius: '20px',
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // p: 1,
          }}
        >
          <img
            src="logo-placeholder-image.png"
            style={{ aspectRatio: "1/1", width: "100%" }}
          />
          {/* <Typography variant="h6">AI-MODEL-MAKER</Typography> */}
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowX: "hidden",
          }}
        >
          <SidebarIconMenu items={items} />
        </Box>

        <Box sx={{ width:'100%' , display:'flex'}}>
          <LanguageChanger/>
        </Box>

        <Box sx={{ width:'100%' , display:'flex'}}>
          <ThemeToggle />
        </Box>
         
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "2",
          bgcolor: "background.standOut",
          mx: 1,
          ml: 0,
          borderRadius: '20px',
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
          mx: 1,
          ml: 0,
          borderRadius: '20px',
          fontWeight: 'fontWeightLight',
          py: 1,
          px: 2,
        }}
      >
        <p sx={{
            p: 2,
            width: 20 ,
        }}>
          {/* <Typography sx={{ color: isActive?"text.contrast" : "text.main", fontSize: "16px", fontWeight:500 }}>
            Това е показно за input:
          </Typography> */}
          
        </p>
        <Button

          sx={{
            bgcolor:"primary.main",
            color: "Black",
            m:2,
          }}
        >
          ON/OFF
        </Button>
      </Box>
    </Box>
  );
}
