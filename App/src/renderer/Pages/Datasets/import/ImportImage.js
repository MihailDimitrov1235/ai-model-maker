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
  const { t, i18n } = useTranslation();
  const [showButton, setShowButton] = useState(false);
  const [images, setImages] = useState([]);
  const [label, setLabel] = useState([]);
  const [uploadLabelsError, setUploadLabelsError] = useState(1);
  const [uploadImagesError, setUploadImagesError] = useState(1);
  const [selectedValue, setSelectedValue] = useState('');
  const [textUploadImages, setTextUploadImages] = useState(1);
  const [textUploadLabels, setTextUploadLabels] = useState(1);

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
        setUploadImagesError(1);
        setTextUploadImages(2);
      } else {
        setUploadImagesError(2);
      }
    });
    window.electronAPI.handleSetImageLabel((event, value) => {
      if (!value.canceled && value.data != '') {
        setLabel(value.data);
        setUploadLabelsError(1);
        setTextUploadLabels(2);
      } else {
        setUploadLabelsError(2);
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
          <UploadButton
            onClick={handleClick}
            text={
              textUploadImages == 1
                ? t('choose-image-folder')
                : t('chosen-images')
            }
            //text={t('choose-image-folder')}
            error={uploadImagesError == 1 ? '' : t('no-images-found')}
            uploadItem={images.length}
          />
          <UploadButton
            onClick={handleClickLabel}
            text={
              textUploadLabels == 1 ? t('choоse-labels') : t('chosen-txt-file')
            }
            //text={t('choose-labels')}
            disabled={selectedValue ? false : true}
            icon="file"
            error={uploadLabelsError == 1 ? '' : t('no-labels-found')}
          />
        </Box>
        <Box>
          {showButton && (
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}
            >
              <Link
                to={`review/${selectedValue}?array=${encodeURIComponent(
                  JSON.stringify(images),
                )}&label=${encodeURIComponent(JSON.stringify(label))}`}
              >
                <Button>{t('overview-button')}</Button>
              </Link>
              <Button>{t('finish-button')}</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ImportImage;
