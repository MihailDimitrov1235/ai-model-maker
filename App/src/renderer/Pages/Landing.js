import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
  Typography,
  Card,
  CardMedia,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ShowDiagrams } from '../Components/Charts/BarChart_GoogleLib';
import CardElement from '../Components/Cards/DatasetCard';
import { useNavigate } from 'react-router-dom';
import image1 from '../../../assets/images/img1.png';
import createDataset from '../../../assets/images/createDataset.PNG';
import createModelImage from '../../../assets/images/createModel.PNG';
import trainModel from '../../../assets/images/trainModel.PNG';

//import enIcon from '../../../../assets/images/createDatasets.PNG';

// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };

const Landing = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const datasets = [
    { title: 'Road Sign', Miho: 'waka waka eee', Alvin: 'Chiponoskovci' },
    { title: 'Road Sign' },
    { title: 'Road Sign' },
    { Miho: 'waka waka eee' },
    { Alvin: 'Chiponoskovci' },
  ];
  const navigateToCreatDataset = () => {
    navigate(`/data/import`);
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
          <h2>{t('homepage')}</h2>
          <Box>
            <Button variant="contrast">Go to SetUp</Button>
          </Box>
        </Box>

        <Box
          sx={{
            margin: '50px',
          }}
        >
          <Typography>
            <b>Добре дошли</b> в нашето приложение, в което всеки, който е
            запознат с програмирането или по-точно с изкуствения интелект може
            се възползва от функциите на програмата ни. Тук можете да създавате
            и тренирате модели, които можете да използвате в направата на
            приложения или програми, които правите. Тук можете да вкарвате и
            тренирате информация под формата на таблици или снимков материал.
            Можете бързо, лесно и ефетктивно да правите модели с помощта на
            machine learning(ML).
          </Typography>
          <Typography mt={3} variant="h4">
            <b>Започнете с няколко лесни стъпки</b>
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card raised>
                <CardMedia
                  component="img"
                  height="250"
                  image={createDataset} // Adjust the path to your image file
                  alt="Example"
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
              <Typography variant="h6" mt={2}>
                <b>Create Dataset</b>
              </Typography>
              <Typography mb={2}>
                <b>Първата стъпка</b>, която трябва да поемета е да си вкарате
                някакъв вид dataset под формата на таблица или снимки, като
                отидете 'Данни' и изберете 'Импорт'
              </Typography>
              <Button variant="contrast" onClick={navigateToCreatDataset}>
                Create Dataset
              </Button>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card raised>
                <CardMedia
                  component="img"
                  height="250"
                  image={createModelImage} // Adjust the path to your image file
                  alt="Example"
                  sx={{ objectFit: 'contain' }}
                />
              </Card>

              <Typography variant="h6" mt={2}>
                <b>Create Model</b>
              </Typography>
              <Typography mb={2}>
                <b>Втора стъпка</b> е да си направите модел на база някой
                dataset, който сте направили преди това, като отидете на
                'Модели' и след това на 'Създаване'.
              </Typography>
              <Button variant="contrast">Create Model</Button>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card raised>
                <CardMedia
                  component="img"
                  height="250"
                  image={trainModel} // Adjust the path to your image file
                  alt="Example"
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
              <Typography variant="h6" mt={2}>
                <b>Train Model</b>
              </Typography>
              <Typography mb={2}>
                <b>Трета стъпка</b> е да изберете кой модел искате да го
                тренирате, като изберете бутона 'Тренирай Модел'.
              </Typography>
              <Button variant="contrast">Train Model</Button>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card raised>
                <CardMedia
                  component="img"
                  height="250"
                  image={image1} // Adjust the path to your image file
                  alt="Example"
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
              <Typography variant="h6" mt={2}>
                <b>Test your Model</b>
              </Typography>
              <Typography mb={2}>
                <b>Последната стъпка</b> е вече като сте готови с тренирането да
                го тествате и да видите какви резултати вади, като отидете на
                'Използвай'.
              </Typography>
              <Button variant="contrast">Test Model</Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              margin: '30px',
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
