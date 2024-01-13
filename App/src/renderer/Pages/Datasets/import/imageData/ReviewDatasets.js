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
import { Outlet, useSearchParams } from 'react-router-dom';

function ReviewDatasets() {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const [imageSrc, setImageSrc] = useState('');

  const imagesPaths = JSON.parse(
    decodeURIComponent(queryParameters.get('array')),
  );

  console.log('LABELS=====' + queryParameters.get('label'));

  const handleClickLabel = () => {
    window.electronAPI.selectLabel();
  };

  const [page, setPage] = useState(1);
  const [labels, setLabels] = useState([]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Send a request to the main process with the absolute path
    window.electronAPI.requestImage({
      path: imagesPaths[page - 1],
    });
    setLabels(queryParameters.get('label').split('\\r'));
    // Listen for the response from the main process
    window.electronAPI.handleRequestImage((event, image) => {
      setImageSrc(image.data);
    });

    // Clean up the event listener when the component unmounts
  }, []);

  useEffect(() => {
    // Send a request to the main process with the absolute path
    window.electronAPI.requestImage({
      path: imagesPaths[page - 1],
    });
  }, [page]);

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
        <Pagination
          count={imagesPaths.length}
          page={page}
          onChange={handleChangePage}
        />

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
        <Box sx={{ width: '50%', p: 3 }}>
          <Outlet context={[labels, setLabels]} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewDatasets;
