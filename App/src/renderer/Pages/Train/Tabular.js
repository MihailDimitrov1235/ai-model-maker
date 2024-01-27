import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Tabular() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [info, setInfo] = useState({});

  const [learningRate, setLearningRate] = useState(0.001);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(24);
  const [target, setTarget] = useState(null);

  const handleLearningRateChange = (event) => {
    const newValue = event.target.value;
    setLearningRate(newValue);
  };

  const handleBatchSizeChange = (event) => {
    const newValue = event.target.value;
    setBatchSize(newValue);
  };

  const handleEpochsChange = (event) => {
    const newValue = event.target.value;
    setEpochs(newValue);
  };

  const fetchInfo = async () => {
    const newInfo = await window.electronAPI.getDatasetInfo({ name: id });
    setInfo(newInfo);
    console.log(newInfo);
  };
  //   fetchInfo();
  useEffect(() => {
    fetchInfo();
  }, []);
  const [train, setTrain] = useState(85);
  const [val, setVal] = useState(10);
  const [test, setTest] = useState(5);
  const handleTrainChange = (event) => {
    updateValues(train, event.target.value, setVal, val, setTest, test);
    setTrain(event.target.value);
  };
  const handleValChange = (event) => {
    updateValues(val, event.target.value, setTrain, train, setTest, test);
    setVal(event.target.value);
  };
  const handleTestChange = (event) => {
    updateValues(test, event.target.value, setVal, val, setTrain, train);
    setTest(event.target.value);
  };

  const updateValues = (
    oldValue,
    currentValue,
    setValue1,
    value1,
    setValue2,
    value2,
  ) => {
    const dif = currentValue - oldValue;
    if (dif > 0) {
      if (value1 - dif / 2 < 0) {
        setValue1(0);
        setValue2(value2 - dif + value1);
      } else if (value2 - dif / 2 < 0) {
        setValue2(0);
        setValue1(value1 - dif + value2);
      } else {
        setValue2(value2 - dif / 2);
        setValue1(value1 - dif / 2);
      }
    } else {
      setValue2(value2 - dif / 2);
      setValue1(value1 - dif / 2);
    }
  };

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={3}>
      <Typography variant="h6">{t('select-model-options')}</Typography>
      <Box display={'flex'} width={'100%'} gap={3}>
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
              value={learningRate}
            />
          </Box>

          <Box display={'flex'} gap={3} alignItems={'center'}>
            <Typography textAlign={'right'} flex={1}>
              {t('epochs')}
            </Typography>
            <TextField
              type="number"
              value={epochs}
              onChange={handleEpochsChange}
              sx={{ flex: 8 }}
              fullWidth
            />
          </Box>

          <Box display={'flex'} gap={3} alignItems={'center'}>
            <Typography textAlign={'right'} flex={1}>
              {t('batch-size')}
            </Typography>
            <TextField
              type="number"
              value={batchSize}
              onChange={handleBatchSizeChange}
              sx={{ flex: 8 }}
              fullWidth
            />
          </Box>

          <Box display={'flex'} gap={3} alignItems={'center'}>
            <Typography textAlign={'right'} flex={1}>
              {t('target')}
            </Typography>
            <Select
              sx={{ flex: 8 }}
              value={target}
              onChange={(event) => {
                setTarget(event.target.value);
              }}
            >
              {info.header?.map((title) => (
                <MenuItem value={title}>{title}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Typography variant="p">{t('dataset-split')}</Typography>
          <Box
            display={'flex'}
            width={'auto'}
            minHeight={'200px'}
            flex={1}
            gap={3}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography>{t('train')}</Typography>
              <Slider
                value={train}
                onChange={handleTrainChange}
                orientation="vertical"
                valueLabelDisplay="auto"
                step={1}
              />
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography>{t('validation')}</Typography>
              <Slider
                value={val}
                onChange={handleValChange}
                orientation="vertical"
                valueLabelDisplay="auto"
                step={1}
              />
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography>{t('test')}</Typography>
              <Slider
                value={test}
                onChange={handleTestChange}
                orientation="vertical"
                valueLabelDisplay="auto"
                step={1}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} width={'100%'} justifyContent={'right'}>
        <Button variant="contrast">{t('finish')}</Button>
      </Box>
    </Box>
  );
}
