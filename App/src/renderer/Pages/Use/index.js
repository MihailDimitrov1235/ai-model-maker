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

export default function Use() {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modelType, setModelType] = useState('');
  const [models, setModels] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // handleDatasetTypeChange(location.pathname.split('/')[0] || '');
    // setModel(location.pathname.split('/')[2] || null);
    console.log(location);
  }, [location]);

  const handleModelTypeChange = async (type) => {
    if (type != modelType) {
      if (!location.pathname.startsWith(`/use/${type}`)) {
        console.log(`/use/${type}`);
        navigate(`/use/${type}`);
        setModel(null);
      }
      setModelType(type);
      if (type == 'tabular') {
        const tabularDatasets = await window.electronAPI.getTabularModels();
        setModels(tabularDatasets);
      } else if (type == 'image') {
        const imageDatasets = await window.electronAPI.getImageModels();
        setModels(imageDatasets);
      }
    }
  };

  const handleChangeModel = (event, newValue) => {
    setModel(newValue);
    if (newValue == null) {
      navigate(`/use`);
      return;
    }
    if (modelType == 'tabular') {
      navigate(`/use/tabular/${newValue}`);
    } else if (modelType == 'image') {
      if (newValue.type == 'classification') {
        navigate(`/use/image/classification/${newValue}`);
      } else if (newValue.type == 'detection') {
        navigate(`/use/image/detection/${newValue}`);
      } else if (newValue.type == 'captioning') {
        navigate(`/use/image/captioning/${newValue}`);
      }
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, m: 3 }}>
      <Typography variant="h5">{t('use-model')}</Typography>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>{t('model-type')}</InputLabel>
          <Select
            value={modelType}
            label={t('model-type')}
            onChange={(event) => handleModelTypeChange(event.target.value)}
          >
            <MenuItem value={'tabular'}>{t('tabular')}</MenuItem>
            <MenuItem value={'image'}>{t('image')}</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          value={model}
          onChange={handleChangeModel}
          sx={{ flex: 1 }}
          disabled={models == ''}
          options={models}
          renderInput={(params) => <TextField {...params} label={t('model')} />}
        />
      </Box>
      <Outlet />
    </Box>
  );
}
