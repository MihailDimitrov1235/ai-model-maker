import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Select,
  Slider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';
import CustomDialog from '../../Components/Utils/CustomDialog';

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

  const [trainAccuracyArray, setTrainAccuracyArray] = useState('');
  const [trainLossArray, setTrainLossArray] = useState('');
  const [valAccuracyArray, setValAccuracyArray] = useState('');
  const [valLossArray, setValLossArray] = useState('');
  const [testAccuracyArray, setTestAccuracyArray] = useState('');
  const [testLossArray, setTestLossArray] = useState('');

  const [xAxis, setXAxis] = useState('');

  const [maxRecordsPerGraph, setMaxRecordsPerGraph] = useState(50);
  const [modelData, setModelData] = useState(null);
  const [dataset, setDataset] = useState(null);

  const [learningRate, setLearningRate] = useState('');
  const [epochs, setEpochs] = useState('');
  const [learningRateError, setLearningRateError] = useState('');
  const [epochsError, setEpochsError] = useState('');

  const [openTrainDialog, setOpenTrainDialog] = useState(false);
  const [trainText, setTrainText] = useState(t('starting-training'));
  const [trainProgress, setTrainProgress] = useState(null);

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

    setTrainText(t('starting-training'));
    setTrainProgress(null);
    setOpenTrainDialog(true);
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
      result_type: dataset.selectedTypes[modelData.target].type,
    });
  };

  function selectRecords(array, numRecords) {
    const totalRecords = array.length;

    // Ensure we have enough records to select from
    if (totalRecords <= numRecords) {
      return array;
    }

    // Calculate the number of records to select from the middle
    const middleRecordsCount = numRecords - 2;
    const interval = Math.max(
      1,
      Math.floor(totalRecords / (middleRecordsCount + 1)),
    );

    // Select records from the middle
    const middleRecords = [];
    for (let i = interval; i < totalRecords - 1; i += interval) {
      middleRecords.push(array[i]);
    }

    // Construct the final array
    const selectedRecords = [
      array[0],
      ...middleRecords,
      array[array.length - 1],
    ];

    return selectedRecords;
  }

  const fetchData = async () => {
    const response = await window.electronAPI.getModel({
      model: id,
      type: 'table',
    });
    if (response.failed) {
      return;
    }
    setModelData(response);
    setLearningRate(0.001);
    setEpochs(10);
    if (response.epochs.length > 0) {
      let newTrainAccuracyArray = [];
      let newTrainLossArray = [];
      let newValAccuracyArray = [];
      let newValLossArray = [];
      let newTestAccuracyArray = [];
      let newTestLossArray = [];

      let newXAxis = [];
      response.epochs.forEach((epoch, idx) => {
        newXAxis.push(idx + 1);
        newTrainAccuracyArray.push(epoch.train_accuracy);
        newTrainLossArray.push(epoch.train_loss);
        newValAccuracyArray.push(epoch.val_accuracy);
        newValLossArray.push(epoch.val_loss);
        newTestAccuracyArray.push(epoch.test_accuracy);
        newTestLossArray.push(epoch.test_loss);
      });

      setTrainAccuracyArray(newTrainAccuracyArray);
      setTrainLossArray(newTrainLossArray);
      setValAccuracyArray(newValAccuracyArray);
      setValLossArray(newValLossArray);
      setTestAccuracyArray(newTestAccuracyArray);
      setTestLossArray(newTestLossArray);
      setXAxis(newXAxis);
    }
    const ds = await window.electronAPI.getDatasetInfo({
      name: response.dataset,
    });
    setDataset(ds);
  };

  useEffect(() => {
    if (!openTrainDialog) {
      fetchData();
    }
  }, [id, openTrainDialog]);

  useEffect(() => {
    window.electronAPI.handleChangeTrainingText((event, value) => {
      setTrainText(value);
    });
    window.electronAPI.handleChangeTrainingProgress((event, value) => {
      setTrainProgress(value);
    });
    window.electronAPI.handleCloseTrainingDialog((event, value) => {
      setOpenTrainDialog(false);
    });

    return () => {
      window.electronAPI.removeListener('change-training-text');
      window.electronAPI.removeListener('change-training-progress');
      window.electronAPI.removeListener('close-training-dialog');
    };
  }, []);

  const handleCancelTraining = () => {
    window.electronAPI.cancelTraining();
  };

  const handleMaxRecordsPerGraphChange = (event, value) => {
    setMaxRecordsPerGraph(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', m: 3, gap: 3 }}>
      <CustomDialog
        open={openTrainDialog}
        setOpen={setOpenTrainDialog}
        title={'train-title'}
        text={trainText}
        buttons={[
          { text: t('cancel'), handleClick: () => handleCancelTraining() },
        ]}
        progress={trainProgress}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">{id}</Typography>
        {modelData != undefined &&
          modelData.epochs &&
          modelData.epochs.length > 0 && (
            <Button variant="contrast">{t('use-model')}</Button>
          )}
      </Box>
      {modelData != undefined ? (
        <>
          {modelData.epochs && modelData.epochs.length > 0 && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Line
                  data={{
                    labels: selectRecords(xAxis, maxRecordsPerGraph),
                    datasets: [
                      {
                        label: t('train-loss'),
                        data: selectRecords(trainLossArray, maxRecordsPerGraph),
                        fill: false,
                        tension: 0.1,
                        borderColor: 'rgb(75, 192, 192)',
                      },
                      {
                        label: t('val-loss'),
                        data: selectRecords(valLossArray, maxRecordsPerGraph),
                        fill: false,
                        tension: 0.1,
                        borderColor: 'rgb(2, 173, 73)',
                      },
                      {
                        label: t('test-loss'),
                        data: selectRecords(testLossArray, maxRecordsPerGraph),
                        fill: false,
                        tension: 0.1,
                        borderColor: 'rgb(255, 99, 132)',
                      },
                    ],
                  }}
                  options={options}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Line
                  data={{
                    labels: selectRecords(xAxis, maxRecordsPerGraph),
                    datasets: [
                      {
                        label: t('train-accuracy'),
                        data: selectRecords(
                          trainAccuracyArray,
                          maxRecordsPerGraph,
                        ),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                      },
                      {
                        label: t('val-accuracy'),
                        data: selectRecords(
                          valAccuracyArray,
                          maxRecordsPerGraph,
                        ),
                        fill: false,
                        borderColor: 'rgb(2, 173, 73)',
                        tension: 0.1,
                      },
                      {
                        label: t('test-accuracy'),
                        data: selectRecords(
                          testAccuracyArray,
                          maxRecordsPerGraph,
                        ),
                        fill: false,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={options}
                />
              </Box>
            </Box>
          )}
          {modelData.epochs && modelData.epochs?.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Typography variant="p">{t('records-per-graph')}</Typography>
              <Slider
                value={maxRecordsPerGraph}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={100}
                onChange={handleMaxRecordsPerGraphChange}
              />
            </Box>
          )}
          {modelData && modelData.epochs && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="p">
                {t('model-trained-for')}: {modelData.epochs.length}{' '}
                {t('epochs')}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Button onClick={handleTrain} variant="contrast">
                  {t('train-model')}
                </Button>
              </Box>
            </Box>
          )}

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
