import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Models = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [models, setModels] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const modelsPerPage = 12;
  useEffect(() => {
    // Send a request to the main process for models count
    window.electronAPI.getModelsCount();

    // Listen for the response from the main process
    window.electronAPI.handleSetModels((event, response) => {
      setModels(response.data);
    });

    window.electronAPI.handleSetModelsCount((event, request) => {
      let newPageCount = Math.ceil(request.data / modelsPerPage);
      setPageCount(newPageCount);
      // Send a request to the main process for models
      window.electronAPI.getModels({
        page: page,
        modelsPerPage: modelsPerPage,
      });
    });
  }, []);

  const handleClick = (event) => {
    navigate('/models/create');
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    window.electronAPI.getModels({
      page: value,
      modelsPerPage: modelsPerPage,
    });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: '50px',
          gap: 3,
          minHeight: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <h2>{t('models')}</h2>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              sx={{
                input: {
                  padding: '8px',
                },
              }}
            />
            <Button variant="contrast" onClick={handleClick}>
              {t('new-model')}
            </Button>
          </Box>
        </Box>

        {models != null && models.length > 0 ? (
          <Grid container spacing={4}>
            {models?.map((model, index) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={index}>
                {/* <CardElement
                    title={dataset.name}
                    type={dataset.type}
                    subType={dataset.subType}
                    records={dataset.records}
                  /> */}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 30,
            }}
          >
            {models == null ? (
              <CircularProgress />
            ) : (
              <>
                <ReportGmailerrorredIcon sx={{ fontSize: '200px' }} />
                <Typography variant="h3" sx={{ mb: 4 }}>
                  {t('no-models-found')}
                </Typography>
                <Button variant="contrast" onClick={handleClick}>
                  {t('new-model')}
                </Button>
              </>
            )}
          </Box>
        )}
        {models != null && models.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'end',
              flex: 1,
              pb: 3,
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Models;
