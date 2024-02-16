import { Button, Grid, Box, Typography, Card, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import createDataset from '../../../assets/images/createDataset.PNG';
import createModelImage from '../../../assets/images/createModel.PNG';
import trainModel from '../../../assets/images/trainModel.PNG';

const Landing = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const items = [
    {
      text: (
        <>
          <b>Първата стъпка</b>, която трябва да поемета е да си вкарате някакъв
          вид dataset под формата на таблица или снимки, като отидете 'Данни' и
          изберете 'Импорт'
        </>
      ),
      image: createDataset,
      title: (
        <>
          <b>Create Dataset</b>
        </>
      ),
      btn: { name: 'Create Dataset', onClick: () => navigate(`/data/import`) },
    },
    {
      text: (
        <>
          <b>Втора стъпка</b> е да си направите модел на база някой dataset,
          който сте направили преди това, като отидете на 'Модели' и след това
          на 'Създаване'.
        </>
      ),
      image: createModelImage,
      title: (
        <>
          <b>Create Model</b>
        </>
      ),
      btn: { name: 'Create Model', onClick: () => navigate(`/model/create`) },
    },
    {
      text: (
        <>
          <b>Трета стъпка</b> е да изберете кой модел искате да го тренирате,
          като изберете бутона 'Тренирай Модел'.
        </>
      ),
      image: trainModel,
      title: (
        <>
          <b>Train Model</b>
        </>
      ),
      btn: { name: 'Train Model', onClick: () => navigate(`/models`) },
    },
    {
      text: (
        <>
          <b>Последната стъпка</b> е вече като сте готови с тренирането да го
          тествате и да видите какви резултати вади, като отидете на
          'Използвай'.
        </>
      ),
      image: trainModel,
      title: (
        <>
          <b>Use Model</b>
        </>
      ),
      btn: { name: 'Use Model', onClick: () => navigate(`/use`) },
    },
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
          <Box>
            <Button variant="contrast">Go to SetUp</Button>
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
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

          <Grid container spacing={3} mt={2}>
            {items.map((it, index) => (
              <Grid
                key={index}
                item
                xs={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Card raised>
                    <CardMedia
                      component="img"
                      height="250"
                      image={it.image}
                      alt="Create dataset image"
                      sx={{ objectFit: 'contain' }}
                    />
                  </Card>
                  <Typography variant="h6" mt={2}>
                    {it.title}
                  </Typography>
                  <Typography mb={2}>{it.text}</Typography>
                </Box>
                <Button variant="contrast" onClick={it.btn.onClick}>
                  {it.btn.name}
                </Button>
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
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
