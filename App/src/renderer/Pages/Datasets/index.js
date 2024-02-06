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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Datasets = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [selectedTypeValue, setSelectedTypeValue] = useState('');
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const datasetsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const newDatasetsCount = await window.electronAPI.getDatasetsCount();
    let newPageCount = Math.ceil(newDatasetsCount / datasetsPerPage);
    setPageCount(newPageCount);
    const newDatasets = await window.electronAPI.getDatasets({
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
  const handleSelectTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypeValue(value);
    console.log(value);
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSelectedSearchValue(value);
    console.log(value);
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
              width: '70%',
            }}
          >
            <FormControl sx={{ width: '35%' }}>
              <InputLabel>{t('type')}</InputLabel>
              <Select
                id="mySelect"
                label={'type'}
                value={selectedTypeValue}
                sx={{ flex: 1, height: '56px' }}
                onChange={handleSelectTypeChange}
              >
                <MenuItem value={'tabular'}>{t('tabular data')}</MenuItem>
                <MenuItem value={'classification'}>
                  {t('image-classification')}
                </MenuItem>
                <MenuItem value={'detection'}>{t('object-detection')}</MenuItem>
                <MenuItem value={'captioning'}>{t('captioning')}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              placeholder="Search"
              onChange={handleSearchChange}
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

        {datasets != null && datasets.length > 0 ? (
          <Grid container spacing={4}>
            {datasets?.map((dataset, index) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={index}>
                {dataset.name.toLowerCase().includes(selectedSearchValue) && (
                  // {console.log(dataset.subType)}
                  // {dataset.subType === selectedTypeValue && (
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
                <Button variant="contrast" onClick={handleClick}>
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
