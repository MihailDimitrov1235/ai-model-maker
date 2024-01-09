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

function ReviewDatasets(props) {
  const handleClickLabel = () => {
    window.electronAPI.selectLabel();
  };
  const { t } = useTranslation();
  /*const { location } = props;
  const searchParams = new URLSearchParams(location.search);
  const arrayString = searchParams.get('array');
  const decodedArray = JSON.parse(decodeURIComponent(arrayString));
  useEffect(() => {
    // Check labels
    if (images && label && images.length > 0 && label.length > 0) {
      setShowButton(true);
    }
  }, []);
*/
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
            background: 'gray',
            width: '50%',
            height: '500px',
            border: 'solid',
            alignContent: 'center',
          }}
        >
          <img src="C:\AI-MakerProject\ai-model-maker\App\assets\images\bulgaria.svg" />
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
