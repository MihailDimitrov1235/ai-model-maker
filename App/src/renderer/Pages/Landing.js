import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ShowDiagrams } from '../Components/Charts/BarChart_GoogleLib';
import CardElement from '../Components/Cards/DatasetCard';

// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };

const Landing = function () {
  const { t, i18n } = useTranslation();

  const datasets = [
    { title: 'Road Sign', Miho: 'waka waka eee', Alvin: 'Chiponoskovci' },
    { title: 'Road Sign' },
    { title: 'Road Sign' },
    { Miho: 'waka waka eee' },
    { Alvin: 'Chiponoskovci' },
  ];

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
          <h2>{t('homepage')}</h2>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
            <Button variant="contrast">{t('new-datasets')}</Button>
          </Box>
        </Box>

        <Box
          sx={{
            margin: '50px',
          }}
        >
          <Grid container spacing={4}>
            {datasets.map((dataset, index) => (
              <Grid item xs={4} key={index}>
                <CardElement title={dataset.title} />
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
            <Pagination count={10} color="primary" />
          </Box>
        </Box>
      </Box>

      {/* <ShowDiagrams/>
            <Button variant="main" onClick={click} style={{maxWidth:'100px'}}>{t('Test')}</Button> */}
    </>
  );
};

export default Landing;
