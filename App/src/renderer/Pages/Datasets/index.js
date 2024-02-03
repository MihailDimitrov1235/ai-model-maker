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
import { ShowDiagrams } from '../../Components/Charts/BarChart_GoogleLib';
import CardElement from '../../Components/Cards/DatasetCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Datasets = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [datasetsInfo, setDatasetsInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const datasetsPerPage = 12;
  useEffect(() => {
    // Send a request to the main process for datasets count
    window.electronAPI.getDatasetsCount();

    // Listen for the response from the main process
    window.electronAPI.handleRequestDatasetsInfo((event, datasets) => {
      setDatasetsInfo(datasets.data);
    });

    window.electronAPI.handleSetDatasetsCount((event, datasetsCount) => {
      let newPageCount = Math.ceil(datasetsCount.data / datasetsPerPage);
      setPageCount(newPageCount);
      // Send a request to the main process for datasets
      window.electronAPI.requestDatasetsInfo({
        page: page,
        datasetsPerPage: datasetsPerPage,
      });
    });
  }, []);

  const handleClick = (event) => {
    navigate('/data/import');
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    window.electronAPI.requestDatasetsInfo({
      page: value,
      datasetsPerPage: datasetsPerPage,
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
          <h2>{t('dataset')}</h2>

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
              {t('new-dataset')}
            </Button>
          </Box>
        </Box>

        {datasetsInfo != null && datasetsInfo.length > 0 ? (
          <Grid container spacing={4}>
            {datasetsInfo?.map((dataset, index) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={index}>
                <CardElement
                  title={dataset.name}
                  type={dataset.type}
                  subType={dataset.subType}
                  records={dataset.records}
                />
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
            {datasetsInfo == null ? (
              <CircularProgress />
            ) : (
              <>
                <ReportGmailerrorredIcon sx={{ fontSize: '200px' }} />
                <Typography variant="h3" sx={{ mb: 4 }}>
                  {t('no-datasets-found')}
                </Typography>
                <Button variant="contrast" onClick={handleClick}>
                  {t('new-dataset')}
                </Button>
              </>
            )}
          </Box>
        )}
        {datasetsInfo != null && datasetsInfo.length > 0 && (
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

export default Datasets;
