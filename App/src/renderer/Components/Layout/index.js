import {
  Box,
  Divider,
  Dialog,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import SidebarIconMenu from './SidebarIconMenu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import DatasetIcon from '@mui/icons-material/Dataset';
import ScienceIcon from '@mui/icons-material/Science';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageChanger from './LanguageChanger';
import { useEffect, useState } from 'react';
import logo from '../../../../assets/logo-placeholder-image.png';
import Snack from '../Snack';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const { navigate } = useNavigate()
  const [openNoPython, setOpenNoPython] = useState(false);
  const [openNoConda, setOpenNoConda] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    window.electronAPI.checkVenv();
    window.electronAPI.handleMissingConda((event, value) => {
      setOpenNoConda(true);
    });
    window.electronAPI.handleMissingVenv((event, value) => {
      setOpenNoPython(true);
    });
  }, []);

  const handleCloseNoPython = () => {
    setOpenNoPython(false);
  };

  const handleCloseNoConda = () => {
    setOpenNoPython(false);
  };

  const handleCreateVenv = () => {
    window.electronAPI.createVenv();
    handleCloseNoPython();
  };

  const items = [
    { type: 'item', name: t('Home'), icon: HomeIcon, href: '/' },
    { type: 'item', name: t('Data'), icon: DatasetIcon, href: '/data' },
    { type: 'item', name: t('Train'), icon: SchoolIcon, href: '/train' },
    { type: 'item', name: t('Test'), icon: ScienceIcon, href: '/test' },
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
          { text: t('use-existing'), variant:'main-inherit', handleClick: () => console.log('test') },
          { text: t('new-venv'), variant:'contrast-inherit', handleClick: () => handleCreateVenv() },
        ]}
      />
      <Snack
        open={openNoConda}
        setOpen={setOpenNoConda}
        message={t('no-conda')}
        title={t('no-conda-title')}
        variant="warning"
        buttons={[
          { text: t('download-conda'), downloadLink:`https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Windows-x86_64.exe` },
        ]}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '70px',
          maxWidth: '70px',
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
            alt="Logo Placeholder"
            style={{ aspectRatio: '1/1', width: '100%' }}
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
