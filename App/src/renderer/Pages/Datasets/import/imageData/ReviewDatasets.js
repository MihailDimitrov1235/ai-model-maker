import { Box, Button, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

function ReviewDatasets() {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const [imageSrc, setImageSrc] = useState('');

  const imagesPaths = JSON.parse(
    decodeURIComponent(queryParameters.get('array')),
  );

  const [page, setPage] = useState(1);
  const [labels, setLabels] = useState([]);
  const [classes, setClasses] = useState([]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Send a request to the main process with the absolute path
    window.electronAPI.requestImage({
      path: imagesPaths[page - 1],
    });

    let labelsParam = queryParameters
      .get('label')
      .replace(/["\[\]]/g, '')
      .split('\\r\\n');
    let newLabel = [];
    let classSet = new Set();
    labelsParam.map((item) => {
      if (item != '') {
        newLabel.push(item);
        classSet.add(item);
      }
    });
    setClasses(Array.from(classSet));
    setLabels(newLabel);

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '16px',
          color: 'white',
        }}
      >
        <Pagination
          count={imagesPaths.length}
          page={page}
          onChange={handleChangePage}
        />

        <Box display={'flex'} gap={3}>
          <Button variant="contrast">{t('Delete-image')}</Button>
          <Button variant="contrast">{t('finish-button')}</Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
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
          <Outlet context={[labels, setLabels, classes, setClasses, page]} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewDatasets;
