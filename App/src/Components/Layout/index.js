import {
  Box,
  Divider,
  Dialog,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarIconMenu from "./SidebarIconMenu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DatasetIcon from "@mui/icons-material/Dataset";
import ScienceIcon from "@mui/icons-material/Science";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import LanguageChanger from "./LanguageChanger";
import { useEffect, useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.electronAPI.checkVenv();
    window.electronAPI.handleMissingVenv((event, value) => {
      setOpen(true);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateVenv = () => {
    window.electronAPI.createVenv();
    handleClose()
  };

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
      <Dialog open={open} onClose={handleClose}>
        <DialogContentText
          sx={{ p: 3, pb: 4, bgcolor: "background.main", color: "text.main" }}
        >
          {t("no-py-env")}
        </DialogContentText>
        <DialogActions
          sx={{ bgcolor: "background.main", py: 2, px: 3, gap: 5 }}
        >
          <Button variant="main">{t("use-existing")}</Button>
          <Button onClick={handleCreateVenv} variant="contrast">{t("new-venv")}</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "70px",
          maxWidth: "70px",
          bgcolor: "background.standOut",
          m: 1,
          borderRadius: "20px",
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

        <Divider
          variant="middle"
          light
          sx={{ bgcolor: "background.main", my: 1 }}
        />

        <Box
          sx={{
            flex: 1,
            overflowX: "hidden",
          }}
        >
          <SidebarIconMenu items={items} />
        </Box>

        <Divider
          variant="middle"
          light
          sx={{ bgcolor: "background.main", my: 1 }}
        />

        <Box sx={{ width: "100%", display: "flex" }}>
          <LanguageChanger />
        </Box>

        <Box sx={{ width: "100%", display: "flex" }}>
          <ThemeToggle />
        </Box>
      </Box>

      <Outlet />
    </Box>
  );
}
