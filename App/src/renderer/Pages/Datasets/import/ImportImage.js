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
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ImportImage() {
  const [showButton, setShowButton] = useState(false);

  const [images, setImages] = useState([]);
  const [label, setLabel] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // You can perform additional actions based on the selected value here
    console.log('Selected value:', value);
  };

  useEffect(() => {
    //Setting images variable
    window.electronAPI.handleSetImageFolder((event, value) => {
      if (value.data && value.data.length > 0) {
        setImages(value.data);
      }
    });
    window.electronAPI.handleSetImageLabel((event, value) => {
      if (!value.canceled && value.data) {
        setLabel(value.data);
      }
    });
  }, []);
  useEffect(() => {
    // Check labels
    if (images && label && images.length > 0 && label.length > 0) {
      setShowButton(true);
    }
  }, [images, label]);

  const handleClick = () => {
    window.electronAPI.selectImageFolder();
  };

  const handleClickLabel = () => {
    window.electronAPI.selectLabel();
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
            <Select
              label={'type'}
              sx={{ minWidth: '200px' }}
              onChange={handleSelectChange}
            >
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
          <UploadButton
            onClick={handleClickLabel}
            text={t('choose-labels')}
            disabled={selectedValue ? false : true}
            icon="file"
          />
        </Box>
        <Box>
          {showButton && (
            <>
              <Link
                to={`review/${selectedValue}?array=${encodeURIComponent(
                  JSON.stringify(images),
                )}&label=${encodeURIComponent(JSON.stringify(label))}`}
              >
                <Button>{t('overview-button')}</Button>
              </Link>
              <Button>{t('finish-button')}</Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ImportImage;
