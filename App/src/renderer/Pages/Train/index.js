import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Train() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [datasetType, setDatasetType] = useState('');
  const [datasets, setDatasets] = useState('');
  const [dataset, setDataset] = useState(null);

  const handleDatasetTypeChange = async (event) => {
    const type = event.target.value;
    if (type != datasetType) {
      navigate('/train');
      setDataset(null);
      setDatasetType(type);
      if (type == 'tabular') {
        const tabularDatasets = await window.electronAPI.getTabularDatasets();
        setDatasets(tabularDatasets);
      } else if (type == 'image') {
        const imageDatasets = await window.electronAPI.getImageDatasets();
        setDatasets(imageDatasets);
      }
    }
  };

  const handleChangeDataset = (event, newValue) => {
    setDataset(newValue);
    if (datasetType == 'tabular') {
      navigate(`/train/tabular/${newValue}`);
    } else if (datasetType == 'image') {
      if (newValue.type == 'classification') {
        navigate(`/train/image/classification/${newValue}`);
      } else if (newValue.type == 'detection') {
        navigate(`/train/image/detection/${newValue}`);
      } else if (newValue.type == 'captioning') {
        navigate(`/train/image/captioning/${newValue}`);
      }
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, m: 3 }}>
      <Typography variant="h5">{t('create-model')}</Typography>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>{t('dataset-type')}</InputLabel>
          <Select
            value={datasetType}
            label={t('dataset-type')}
            onChange={handleDatasetTypeChange}
          >
            <MenuItem value={'tabular'}>{t('tabular')}</MenuItem>
            <MenuItem value={'image'}>{t('image')}</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          value={dataset}
          onChange={handleChangeDataset}
          sx={{ flex: 1 }}
          disabled={datasets == ''}
          options={datasets}
          renderInput={(params) => (
            <TextField {...params} label={t('dataset')} />
          )}
        />
      </Box>
      <Outlet />
    </Box>
  );
}
