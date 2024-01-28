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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ShowDiagrams } from '../../Components/Charts/BarChart_GoogleLib';
import CardElement from '../../Components/Cards/DatasetCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Datasets = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [datasetsInfo, setDatasetsInfo] = useState([]);
  const [datasetsCount, setDatasetsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageDifference, setPageDifference] = useState(3);
  useEffect(() => {
    // Send a request to the main process for datasets count
    window.electronAPI.getDatasetsCount();

    // Listen for the response from the main process
    window.electronAPI.handleRequestDatasetsInfo((event, datasets) => {
      setDatasetsInfo(datasets.data);
    });

    window.electronAPI.handleSetDatasetsCount((event, datasetsCount) => {
      console.log(datasetsCount.data);
      let newPageCount = Math.ceil(datasetsCount.data / pageDifference);
      //console.log('PAGES=' + pages);
      setPageCount(newPageCount);
      console.log('newPAGECOUNT:');
      console.log(newPageCount);
      // Send a request to the main process for datasets
      window.electronAPI.requestDatasetsInfo({
        page: page,
        pageDifference: pageDifference,
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
      pageDifference: pageDifference,
    });
  };

  return (
    <>
      <Box
        sx={{
          margin: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>{t('datasets')}</h2>

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

        <Box
          sx={{
            margin: '25px',
          }}
        >
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
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              margin: '30px',
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      </Box>

      {/* <ShowDiagrams/>
              <Button variant="main" onClick={click} style={{maxWidth:'100px'}}>{t('Test')}</Button> */}
    </>
  );
};

export default Datasets;
