import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ModelCard from '../../Components/Cards/ModelCard';

const Models = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [models, setModels] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const modelsPerPage = 12;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const newModelsCount = await window.electronAPI.getModelsCount();
    let newPageCount = Math.ceil(newModelsCount / modelsPerPage);
    setPageCount(newPageCount);
    const newModels = await window.electronAPI.getModels({
      page: page,
      modelsPerPage: modelsPerPage,
    });
    setModels(newModels);
  };

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

  const handleOpenModel = (name, type, subtype) => {
    if (!subtype) {
      navigate(`/models/${type}/${name}`);
    } else {
      navigate(`/models/${type}/${subtype}/${name}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 3,
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
                {/* <Button
                  sx={{ width: '100%' }}
                  onClick={() =>
                    handleOpenModel(model.name, model.type, model.subtype)
                  }
                > */}
                <ModelCard
                  model={model}
                  handleOpenModel={() =>
                    handleOpenModel(model.name, model.type, model.subtype)
                  }
                />
                {/* </Button> */}
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
