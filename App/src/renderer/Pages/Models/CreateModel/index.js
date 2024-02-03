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
import { useNavigate, useLocation } from 'react-router-dom';

export default function Train() {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [datasetType, setDatasetType] = useState('');
  const [datasets, setDatasets] = useState([]);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    handleDatasetTypeChange(location.pathname.split('/')[3] || '');
    setDataset(location.pathname.split('/')[4] || null);
  }, [location]);

  const handleDatasetTypeChange = async (type) => {
    if (type != datasetType) {
      if (!location.pathname.startsWith(`/models/create/${type}`)) {
        navigate(`/models/create/${type}`);
        setDataset(null);
      }
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
    console.log(newValue);
    setDataset(newValue);
    if (newValue == null) {
      navigate(`/models/create`);
      return;
    }
    if (datasetType == 'tabular') {
      navigate(`/models/create/tabular/${newValue}`);
    } else if (datasetType == 'image') {
      if (newValue.type == 'classification') {
        navigate(`/models/create/image/classification/${newValue}`);
      } else if (newValue.type == 'detection') {
        navigate(`/models/create/image/detection/${newValue}`);
      } else if (newValue.type == 'captioning') {
        navigate(`/models/create/image/captioning/${newValue}`);
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
            onChange={(event) => handleDatasetTypeChange(event.target.value)}
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
