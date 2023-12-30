import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ImportDataset() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState('');
  useEffect(() => {
    if (location.pathname.includes('tabular')) {
      setType('tabular');
    } else if (location.pathname.includes('image')) {
      setType('image');
    } else if (location.pathname.includes('text')) {
      setType('text');
    } else {
      setType('');
    }
  }, [location]);
  const handleChange = (event) => {
    const val = event.target.value;
    setType(val);
    if (!location.pathname.includes(val)) {
      navigate('/data/import/' + val);
    }
  };
  return (
    <Box
      sx={{
        margin: '50px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <h2>{t('create-dataset')}</h2>
        <FormControl fullWidth>
          <InputLabel>{t('type')}</InputLabel>
          <Select value={type} onChange={handleChange}>
            <MenuItem value={'tabular'}>{t('tabular')}</MenuItem>
            <MenuItem value={'image'}>{t('image')}</MenuItem>
            <MenuItem value={'text'}>{t('text')}</MenuItem>
          </Select>
        </FormControl>
        <Outlet />
      </Box>
    </Box>
  );
}

export default ImportDataset;
