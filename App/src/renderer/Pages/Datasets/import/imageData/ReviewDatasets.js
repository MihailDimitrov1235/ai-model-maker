import { Box, Button, Pagination, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';

function ReviewDatasets() {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();
  const imagesPaths = JSON.parse(
    decodeURIComponent(queryParameters.get('image')),
  );

  const [page, setPage] = useState(1);
  // const [imageWidthParam, setImageWidthParam] = useState(0);
  //const [imageHeigthParam, setImageHeigthParam] = useState(0);
  const [labels, setLabels] = useState([]);
  const [classes, setClasses] = useState([]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleFinish = (event, value) => {
    navigate('/data');

    window.electronAPI.createDatasetLabels({
      name: queryParameters.get('name'),
      labels: labels,
      classes: classes,
      images: imagesPaths,
      type: queryParameters.get('type'),
      // width: queryParameters.get('width'),
      // height: queryParameters.get('height'),
    });
  };

  const fetchImage = async () => {
    const newImage = await window.electronAPI.getImage({
      path: imagesPaths[page - 1],
    });
    setImageSrc(newImage);
  };

  useEffect(() => {
    // Send a request to the main process with the absolute path
    fetchImage();

    setClasses(JSON.parse(decodeURIComponent(queryParameters.get('class'))));
    setLabels(queryParameters.get('label'));
  }, []);

  useEffect(() => {
    // Send a request to the main process with the absolute path
    fetchImage();
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
          <Button variant="contrast">{t('delete-image')}</Button>
          <Button variant="contrast" onClick={handleFinish}>
            {t('finish-button')}
          </Button>
        </Box>
      </Box>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
          p: 3,
        }}
      >
        <Box
          sx={{
            width: '50%',
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
          {classes && (
            <Outlet context={[labels, setLabels, classes, setClasses, page]} />
          )}
        </Box>
      </Card>
    </Box>
  );
}

export default ReviewDatasets;
