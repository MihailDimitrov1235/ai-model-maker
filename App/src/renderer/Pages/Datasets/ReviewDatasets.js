import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';

function ReviewDatasets() {
  const handleClickLabel = () => {
    window.electronAPI.selectLabel();
  };
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();

  const imagesPaths = JSON.parse(
    decodeURIComponent(queryParameters.get('array')),
  );
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Send a request to the main process with the absolute path
    window.electronAPI.requestImage({
      path: imagesPaths[0],
    });

    // Listen for the response from the main process
    window.electronAPI.handleRequestImage((event, image) => {
      console.log(image);
      setImageSrc(image.data);
    });

    // Clean up the event listener when the component unmounts
  }, []);

  return (
    <Box
      sx={{
        display: 'inline',
      }}
    >
      <h2>{t('create-image-labels')}</h2>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5%',
          borderRadius: '16px',
          color: 'white',
        }}
      >
        <Pagination count={10} />

        <Box>
          <Button variant="contrast">{t('Delete-image')}</Button>
          <Button variant="contrast">{t('finish-button')}</Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10%',
          border: 'solid',
        }}
      >
        <Box
          sx={{
            width: '50%',
            height: '500px',
            border: 'solid',
            alignContent: 'center',
          }}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'inline' }}>
          <h3>{t('classes')}</h3>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewDatasets;
