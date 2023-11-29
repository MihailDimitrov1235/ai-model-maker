import { Box, Divider } from "@mui/material";
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
  const { t } = useTranslation();
  const items = [
    { type: "item", name: t("Home"), icon: HomeIcon, href: "/" },
    { type: "item", name: t("Data"), icon: DatasetIcon, href: "/data" },
    { type: "item", name: t("Train"), icon: SchoolIcon, href: "/train" },
    { type: "item", name: t("Test"), icon: ScienceIcon, href: "/test" },
  ];
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
          minWidth: "70px",
          maxWidth: "70px",
          bgcolor: "background.standOut",
          m: 1,
          borderRadius: '20px',
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="logo-placeholder-image.png"
            alt="Logo Placeholder"
            style={{ aspectRatio: "1/1", width: "100%" }}
          />
        </Box>

        <Divider variant="middle" light sx={{ bgcolor:'background.main', my:1}}/>

        <Box
          sx={{
            flex: 1,
            overflowX: "hidden",
          }}
        >
          <SidebarIconMenu items={items} />
        </Box>

        <Divider variant="middle" light sx={{ bgcolor:'background.main', my:1}}/>

        <Box sx={{ width:'100%' , display:'flex'}}>
          <LanguageChanger/>
        </Box>

        <Box sx={{ width:'100%' , display:'flex'}}>
          <ThemeToggle />
        </Box>
      </Box>

      <Outlet/>
    </Box>
  );
}
