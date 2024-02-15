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
//import createDataset from '/assets/images/createDatasets.PNG.png';
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
  const navigateCreatDataset = () => {
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
        </Box>
 
        <Box
          sx={{
            margin: '50px',
          }}
        >
          <Typography>
            Добре дошли в нашето приложение, в което всеки, който е запознат с
            програмирането или по-точно с изкуствения интелект може се възползва
            от функциите на програмата ни. Тук можете да създавате и тренирате
            модели, които можете да използвате в направата на приложения или
            програми, които правите. Тук можете да вкарвате и тренирате
            информация под формата на таблици или снимков материал. Можете
            бързо, лесно и ефетктивно да правите модели с помощта на machine
            learning(ML).
          </Typography>
          <Typography mt={3} variant="h4">
            Започнете с няколко лесни стъпки
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  //image={createDataset} // Adjust the path to your image file
                  alt="Example"
                />
                <Typography variant="h5">My Electron App</Typography>
              </Card>
              <Typography variant="h6" mt={2}>
                Create Dataset
              </Typography>
              <Typography mb={2}>
                Първата стъпка, която трябва да поемета е да си вкарате някакъв
                вид dataset под формата на таблица или снимки
              </Typography>
              <Button variant="contrast" onClick={navigateCreatDataset}>
                Create Dataset
              </Button>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={image1} // Adjust the path to your image file
                  alt="Example"
                />

              </Card>
 
              <Typography variant="h6" mt={2}>
                Create Model
              </Typography>
              <Typography mb={2}>
                Втора стъпка е да си направите модел на база някой dataset,
                който сте направили преди това, като на самия модел му се
                зададат стойности на различните характеристики, чрез които ще
                бъде трениран.
              </Typography>
              <Button variant="contrast">Create Model</Button>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  //image={createDataset} // Adjust the path to your image file
                  alt="Example"
                />
                <Typography variant="h5">My Electron App</Typography>
              </Card>
              <Typography variant="h6" mt={2}>
                Train Model
              </Typography>
              <Typography mb={2}>
                Трета стъпка е да изберете кой модел искате да го тренирате
              </Typography>
              <Button variant="contrast">Train Model</Button>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  //image={createDataset} // Adjust the path to your image file
                  alt="Example"
                />
                <Typography variant="h5">My Electron App</Typography>
              </Card>
              <Typography variant="h6" mt={2}>
                Test your Model
              </Typography>
              <Typography mb={2}>
                Последната стъпка е вече като сте готови с тренирането да го
                тествате и да видите какви резултати вади
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
 