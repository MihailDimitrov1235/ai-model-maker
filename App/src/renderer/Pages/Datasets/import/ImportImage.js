import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import UploadButton from '../../../Components/Utils/UploadButton';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function ImportImage() {
  useEffect(() => {
    window.electronAPI.handleSetImageFolder((event, value) => {
      console.log(value);
      if (value.data == null) {
      }
      /*if (!value.canceled) {
        setFile(value.filePaths);
      }*/
    });
  }, []);

  const handleClick = () => {
    window.electronAPI.selectImageFolder();
  };
  const handleClickLabels = () => {
    window.electronAPI.selectLabels();
  };
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'inline',
      }}
    >
      <Box
        sx={{
          marginTop: '5%',
          borderRadius: '16px',

          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormControl sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}>
            <InputLabel>{t('type')}</InputLabel>
            <Select label={'type'} sx={{ minWidth: '200px' }}>
              <MenuItem value={'classification'}>
                {t('image-classification')}
              </MenuItem>
              <MenuItem value={'detection'}>{t('object-detection')}</MenuItem>
              <MenuItem value={'captioning'}>{t('captioning')}</MenuItem>
            </Select>

            <TextField variant="outlined" placeholder="Width" />
            <TextField variant="outlined" placeholder="Height" />
          </FormControl>
          <Box>
            <Typography color={'text.main'}>{t('no-labels')}</Typography>
            <Button variant="contrast">{t('create-labels')}</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
          <UploadButton onClick={handleClick} text={t('choose-image-folder')} />
          <UploadButton onClick={handleClickLabels} text={t('choose-labels')} />
        </Box>
        <Box>
          <Button>{t('overview-button')}</Button>
          <Button>{t('finish-button')}</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ImportImage;
