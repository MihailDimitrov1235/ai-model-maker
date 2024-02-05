import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';

// Options for customization
const options = {
  scales: {
    x: {
      grid: {
        color: 'rgba(255,255,255, .1)', // Color of the x-axis grid lines
      },
    },
    y: {
      grid: {
        color: 'rgba(255,255,255, .1)', // Color of the y-axis grid lines
      },
      beginAtZero: true,
    },
  },
};

export default function TableModel() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [modelData, setModelData] = useState(null);
  const [lossData, setLossData] = useState(null);
  const [accuracyData, setAccuracyData] = useState(null);
  console.log(id);

  const fetchData = async () => {
    const response = await window.electronAPI.getModel({
      model: id,
      type: 'table',
    });
    setModelData(response);
    console.log(response);
    if (response.epochs.length > 0) {
      let accuracyArray = [];
      let lossArray = [];
      let xAxis = [];
      response.epochs.forEach((epoch, idx) => {
        xAxis.push(idx + 1);
        accuracyArray.push(epoch.accuracy);
        lossArray.push(epoch.loss);
      });

      const newLossData = {
        labels: xAxis,
        datasets: [
          {
            label: t('loss'),
            data: lossArray,
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      };
      setLossData(newLossData);
      const newAccuracyData = {
        labels: xAxis,
        datasets: [
          {
            label: t('accuracy'),
            data: accuracyArray,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      };
      setAccuracyData(newAccuracyData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', m: 3, gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">{id}</Typography>
        {lossData && <Button variant="contrast">{t('use-model')}</Button>}
      </Box>
      {modelData ? (
        <>
          {lossData && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Line data={lossData} options={options} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Line data={accuracyData} options={options} />
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p">
              {t('model-trained-for')}: {modelData.epochs.length} {t('epochs')}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Button variant="contrast">{t('train-model')}</Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
