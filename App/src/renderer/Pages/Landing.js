import { Button, Grid, Box, Typography, Card, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import createDataset from '../../../assets/images/createDataset.PNG';
import createModelImage from '../../../assets/images/createModel.PNG';
import trainModel from '../../../assets/images/trainModel.PNG';

const Landing = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleGoToSetup = () => {
    navigate('learn/setup');
  };
  const items = [
    {
      text: (
        <>
          <b>{t('homepage-text1-part1')}</b>, {t('homepage-text1-part2')}
        </>
      ),
      image: createDataset,
      title: (
        <>
          <b>{t('create-dataset')}</b>
        </>
      ),
      btn: {
        name: t('create-dataset'),
        onClick: () => navigate(`/data/import`),
      },
    },
    {
      text: (
        <>
          <b>{t('homepage-text2-part1')}</b>
          {t('homepage-text2-part2')}
        </>
      ),
      image: createModelImage,
      title: (
        <>
          <b>{t('create-model')}</b>
        </>
      ),
      btn: {
        name: t('create-model'),
        onClick: () => navigate(`/model/create`),
      },
    },
    {
      text: (
        <>
          <b>{t('homepage-text3-part1')}</b>
          {t('homepage-text3-part2')}
        </>
      ),
      image: trainModel,
      title: (
        <>
          <b>{t('train-model')}</b>
        </>
      ),
      btn: { name: t('train-model'), onClick: () => navigate(`/models`) },
    },
    {
      text: (
        <>
          <b>{t('homepage-text4-part1')}</b> {t('homepage-text4-part2')}
        </>
      ),
      image: trainModel,
      title: (
        <>
          <b>{t('use-model')}</b>
        </>
      ),
      btn: { name: t('use-model'), onClick: () => navigate(`/use`) },
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
            <Button variant="contrast" onClick={handleGoToSetup}>
              {t('go-to-setup')}
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography>
            <b>{t('welcome')}</b> {t('homepage-introduction')}
          </Typography>
          <Typography mt={3} variant="h4">
            <b>{t('start-with-easy-step')}</b>
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
