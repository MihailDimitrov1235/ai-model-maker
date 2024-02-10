import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { t } = useTranslation();
  const [openSettings, setOpenSettings] = useState(false);
  const [disableApply, setDisableApply] = useState(true);
  const [config, setConfig] = useState(null);
  const [pythonExeError, setPythonExeError] = useState('');
  const handleOpen = async () => {
    setDisableApply(true);
    setOpenSettings(true);
    let newConfig = await window.electronAPI.getConfig();
    setConfig(newConfig);
  };
  const handleClose = () => {
    setOpenSettings(false);
  };
  const handleApply = async () => {
    await window.electronAPI.changeConfig(config);
    setOpenSettings(false);
  };
  const handleSelectPythonExe = async () => {
    const response = await window.electronAPI.selectPythonExe();
    if (response.filePaths[0].endsWith('python.exe')) {
      setPythonExeError('');
      if (
        !response.canceled &&
        config.python_exe_path != response.filePaths[0]
      ) {
        setConfig({ ...config, python_exe_path: response.filePaths[0] });
        setDisableApply(false);
      }
    } else {
      setPythonExeError(t('expected-file-ending-with-python.exe') + '*');
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Dialog open={openSettings} fullWidth onClose={handleClose}>
        <DialogTitle
          sx={{
            p: 3,
            pb: 2,
            bgcolor: 'background.main',
            color: 'text.main',
          }}
        >
          {t('settings-title')}
        </DialogTitle>
        <DialogContent
          sx={{
            p: 3,
            bgcolor: 'background.main',
            color: 'text.main',
          }}
        >
          {config && config.python_exe_path && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>{t('python_exe_path')}</Typography>
                <TextField
                  sx={{ input: { cursor: 'pointer' }, flex: 1 }}
                  variant="outlined"
                  value={config.python_exe_path}
                  onClick={handleSelectPythonExe}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    color: 'error',
                  }}
                  helperText={
                    <Typography fontSize={'13px'} color={'error'}>
                      {pythonExeError}
                    </Typography>
                  }
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Link
                  to={'/learn/setup/python'}
                  onClick={() => setOpenSettings(false)}
                  style={{ marginLeft: 'auto', color: '#15A4C1' }}
                >
                  {t('how to setup python enviornment?')}
                </Link>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: 'background.main',
            py: 2,
            px: 3,
            gap: 5,
          }}
        >
          <Button disabled={disableApply} onClick={handleApply}>
            {t('apply')}
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={handleOpen}
        sx={{
          mx: 1,
          mb: 1,
          textTransform: 'none',
          width: '100%',
          aspectRatio: '1/1',
          minWidth: '0',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'text.main',
        }}
      >
        <SettingsIcon />
      </Button>
    </Box>
  );
}
