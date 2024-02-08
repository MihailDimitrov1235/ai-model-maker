import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Select,
} from '@mui/material';
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

  const [learningRate, setLearningRate] = useState('');
  const [epochs, setEpochs] = useState('');
  const [learningRateError, setLearningRateError] = useState('');
  const [epochsError, setEpochsError] = useState('');

  const handleLearningRateChange = (event) => {
    const newValue = event.target.value;
    setLearningRate(newValue);
  };

  const handleEpochsChange = (event) => {
    const newValue = event.target.value;
    setEpochs(newValue);
  };

  const handleTrain = () => {
    if (!(learningRate > 0 && learningRate < 1)) {
      setLearningRateError(
        t('expected-number-between') + ' ' + 0 + ' ' + t('and') + ' ' + 1,
      );
      return;
    } else {
      setLearningRateError('');
    }

    if (!(epochs > 0 && epochs <= 100) || epochs % 1 != 0) {
      setEpochsError(
        t('expected-whole-number-between') +
          ' ' +
          0 +
          ' ' +
          t('and') +
          ' ' +
          100,
      );
      return;
    } else {
      setEpochsError('');
    }

    window.electronAPI.trainModel({
      type: 'table',
      model: id,
      dataset: modelData.dataset,
      learning_rate: learningRate,
      epochs: epochs,
      initial_epoch: modelData.epochs.length,
      batch_size: modelData.batch_size,
      target: modelData.target,
      validation_split: modelData.validation_split,
      test_split: modelData.test_split,
    });
  };

  const fetchData = async () => {
    const response = await window.electronAPI.getModel({
      model: id,
      type: 'table',
    });
    setModelData(response);
    setLearningRate(0.001);
    setEpochs(10);
    if (response.epochs.length > 0) {
      let trainAccuracyArray = [];
      let trainLossArray = [];
      let valAccuracyArray = [];
      let valLossArray = [];
      let testAccuracyArray = [];
      let testLossArray = [];

      let xAxis = [];
      response.epochs.forEach((epoch, idx) => {
        xAxis.push(idx + 1);
        trainAccuracyArray.push(epoch.train_accuracy);
        trainLossArray.push(epoch.train_loss);
        valAccuracyArray.push(epoch.val_accuracy);
        valLossArray.push(epoch.val_loss);
        testAccuracyArray.push(epoch.test_accuracy);
        testLossArray.push(epoch.test_loss);
      });

      const newLossData = {
        labels: xAxis,
        datasets: [
          {
            label: t('train-loss'),
            data: trainLossArray,
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(75, 192, 192)',
          },
          {
            label: t('val-loss'),
            data: valLossArray,
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(2, 173, 73)',
          },
          {
            label: t('test-loss'),
            data: testLossArray,
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(255, 99, 132)',
          },
        ],
      };
      setLossData(newLossData);
      const newAccuracyData = {
        labels: xAxis,
        datasets: [
          {
            label: t('train-accuracy'),
            data: trainAccuracyArray,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: t('val-accuracy'),
            data: valAccuracyArray,
            fill: false,
            borderColor: 'rgb(2, 173, 73)',
            tension: 0.1,
          },
          {
            label: t('test-accuracy'),
            data: testAccuracyArray,
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
              <Button onClick={handleTrain} variant="contrast">
                {t('train-model')}
              </Button>
            </Box>
          </Box>

          <Box display={'flex'} flexDirection={'column'} flex={1} gap={3}>
            <Box display={'flex'} gap={3} alignItems={'center'}>
              <Typography textAlign={'right'} flex={1}>
                {t('learning-rate')}
              </Typography>
              <TextField
                onChange={handleLearningRateChange}
                sx={{ flex: 8 }}
                type="number"
                inputProps={{
                  min: 0,
                  max: 1,
                  step: 0.001,
                }}
                error={learningRateError ? true : false}
                helperText={learningRateError}
                value={learningRate}
              />
            </Box>

            <Box display={'flex'} gap={3} alignItems={'center'}>
              <Typography textAlign={'right'} flex={1}>
                {t('epochs')}
              </Typography>
              <TextField
                type="number"
                error={epochsError ? true : false}
                helperText={epochsError}
                value={epochs}
                onChange={handleEpochsChange}
                sx={{ flex: 8 }}
                fullWidth
              />
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
