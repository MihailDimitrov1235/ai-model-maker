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
  InputLabel,
  Select,
  FormControl,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ShowDiagrams } from '../../Components/Charts/BarChart_GoogleLib';
import CardElement from '../../Components/Cards/DatasetCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Datasets = function () {
  let [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const datasetsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    setFilter(searchParams.get('filter'));
  }, [searchParams]);

  const fetchData = async () => {
    const newDatasetsCount = await window.electronAPI.getDatasetsCount({
      filter: filter,
    });
    let newPageCount = Math.ceil(newDatasetsCount / datasetsPerPage);
    setPageCount(newPageCount);
    const newDatasets = await window.electronAPI.getDatasets({
      filter: filter,
      page: page,
      datasetsPerPage: datasetsPerPage,
    });
    setDatasets(newDatasets);
  };

  const handleClick = (event) => {
    navigate('/data/import');
  };

  const handleChangePage = async (event, value) => {
    setPage(value);
    const newDatasets = await window.electronAPI.getDatasets({
      page: value,
      datasetsPerPage: datasetsPerPage,
    });
    setDatasets(newDatasets);
  };
  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSelectedSearchValue(value);
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
          <h2>{t('dataset')}</h2>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <FormControl sx={{ width: '200px' }}>
              <InputLabel>{t('type')}</InputLabel>
              <Select
                id="mySelect"
                label={'type'}
                value={filter}
                sx={{ flex: 1, height: '56px' }}
                onChange={handleFilter}
              >
                <MenuItem value={'table'}>{t('tabular data')}</MenuItem>
                <MenuItem value={'classification'}>
                  {t('image-classification')}
                </MenuItem>
                <MenuItem value={'detection'}>{t('object-detection')}</MenuItem>
                <MenuItem value={'captioning'}>{t('captioning')}</MenuItem>
              </Select>
            </FormControl>

            <Button
              sx={{ height: '56px' }}
              variant="contrast"
              onClick={handleClick}
            >
              {t('new-dataset')}
            </Button>
          </Box>
        </Box>

        {datasets != null && datasets.length > 0 ? (
          <Grid container spacing={4}>
            {datasets?.map((dataset, index) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={index}>
                {dataset.name.toLowerCase().includes(selectedSearchValue) && (
                  <CardElement
                    title={dataset.name}
                    type={dataset.type}
                    subType={dataset.subType}
                    records={dataset.records}
                  />
                )}
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
            {datasets == null ? (
              <CircularProgress />
            ) : (
              <>
                <ReportGmailerrorredIcon sx={{ fontSize: '200px' }} />
                <Typography variant="h3" sx={{ mb: 4 }}>
                  {t('no-datasets-found')}
                </Typography>
                <Button
                  sx={{ height: '56px' }}
                  variant="contrast"
                  onClick={handleClick}
                >
                  {t('new-dataset')}
                </Button>
              </>
            )}
          </Box>
        )}
        {datasets != null && datasets.length > 0 && (
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
