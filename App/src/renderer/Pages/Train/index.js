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
import { useState } from 'react';

const tabularDatasets = [
  { label: 'dataset1' },
  { label: 'dataset2' },
  { label: 'dataset3' },
];

const imageDatasets = [
  { label: 'dataset4' },
  { label: 'dataset5' },
  { label: 'dataset6' },
];

// const tabularDatasets = [
// { label: 'dataset1' },
// { label: 'dataset2' },
// { label: 'dataset3' },
// ];

export default function Train() {
  const { t } = useTranslation();
  const [datasetType, setDatasetType] = useState('');
  const [datasets, setDatasets] = useState('');
  const [dataset, setDataset] = useState(null);

  const handleDatasetTypeChange = (event) => {
    const type = event.target.value;
    if (type != datasetType) {
      setDataset(null);
      setDatasetType(type);
      if (type == 'tabular') {
        setDatasets(tabularDatasets);
      } else if (type == 'image') {
        setDatasets(imageDatasets);
      }
    }
  };

  const handleChangeDataset = (event, newValue) => {
    setDataset(newValue);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, m: 3 }}>
      <Typography variant="h5">{t('create-model')}</Typography>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>{t('dataset')}</InputLabel>
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
    </Box>
  );
}
