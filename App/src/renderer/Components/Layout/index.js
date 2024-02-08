import {
  Box,
  Divider,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import SidebarIconMenu from './SidebarIconMenu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import DatasetIcon from '@mui/icons-material/Dataset';
import ScienceIcon from '@mui/icons-material/Science';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageChanger from './LanguageChanger';
import { useEffect, useState } from 'react';
import logo from '../../../../assets/logo.png';
import Snack from '../Utils/Snack';
import CustomDialog from '../Utils/CustomDialog';

export default function Layout() {
  const { t } = useTranslation();
  const [openNoPython, setOpenNoPython] = useState(false);
  const [openNoConda, setOpenNoConda] = useState(false);
  const [openCreateEnv, setOpenCreateEnv] = useState(false);
  const [createEnvText, setCreateEnvText] = useState(t('create-env-init'));

  useEffect(() => {
    window.electronAPI.checkEnv();
    window.electronAPI.handleMissingConda((event, value) => {
      setOpenNoConda(true);
    });
    window.electronAPI.handleMissingVenv((event, value) => {
      setOpenNoPython(true);
    });
    window.electronAPI.handleChangeCreateEnvText((event, value) => {
      if (value == 'cancel') {
        setCreateEnvText(t('cancel'));
      }
      setCreateEnvText(value);
    });
    window.electronAPI.handleCloseCreateEnv((event, value) => {
      setOpenCreateEnv(false);
    });
  }, []);

  const handleCloseNoPython = () => {
    setOpenNoPython(false);
  };

  const handleCloseNoConda = () => {
    setOpenNoPython(false);
  };

  const handleCreateEnv = () => {
    window.electronAPI.createEnv();
    handleCloseNoPython();
    setOpenCreateEnv(true);
  };

  const handleCancelCreateEnv = () => {
    window.electronAPI.cancelCreateEnv();
    setCreateEnvText(t('create-env-init'));
  };

  const items = [
    { type: 'item', name: t('Home'), icon: HomeIcon, href: '/' },
    { type: 'item', name: t('Data'), icon: DatasetIcon, href: '/data' },
    { type: 'item', name: t('Models'), icon: SmartToyIcon, href: '/models' },
    { type: 'item', name: t('Use'), icon: ScienceIcon, href: '/use' },
    { type: 'item', name: t('Learn'), icon: SchoolIcon, href: '/learn' },
  ];
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        bgcolor: 'background.main',
      }}
    >
      <Snack
        open={openNoPython}
        setOpen={setOpenNoPython}
        message={t('no-py-env')}
        title={t('no-py-env-title')}
        variant="warning"
        buttons={[
          {
            text: t('use-existing'),
            variant: 'main-inherit',
            handleClick: () => console.log('test'),
          },
          {
            text: t('new-venv'),
            variant: 'contrast-inherit',
            handleClick: () => handleCreateEnv(),
          },
        ]}
      />
      <Snack
        open={openNoConda}
        setOpen={setOpenNoConda}
        message={t('no-conda')}
        title={t('no-conda-title')}
        variant="warning"
        buttons={[
          {
            text: t('download-conda'),
            downloadLink: `https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Windows-x86_64.exe`,
            handleClick: () => handleCloseNoConda(),
          },
        ]}
      />

      <CustomDialog
        open={openCreateEnv}
        title={t('create-env-title')}
        text={createEnvText}
        buttons={[
          {
            text: t('cancel'),
            variant: 'main',
            handleClick: () => handleCancelCreateEnv(),
          },
        ]}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70px',
          minWidth: '70px',
          bgcolor: 'background.standOut',
          m: 1,
          borderRadius: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              aspectRatio: '1/1',
              width: '100%',
              borderRadius: '28px',
              padding: '8px',
            }}
          />
        </Box>

        <Divider
          variant="middle"
          light
          sx={{ bgcolor: 'background.main', my: 1 }}
        />

        <Box
          sx={{
            flex: 1,
            overflowX: 'hidden',
          }}
        >
          <SidebarIconMenu items={items} />
        </Box>

        <Divider
          variant="middle"
          light
          sx={{ bgcolor: 'background.main', my: 1 }}
        />

        <Box sx={{ width: '100%', display: 'flex' }}>
          <LanguageChanger />
        </Box>

        <Box sx={{ width: '100%', display: 'flex' }}>
          <ThemeToggle />
        </Box>
      </Box>

      <Outlet />
    </Box>
  );
}
