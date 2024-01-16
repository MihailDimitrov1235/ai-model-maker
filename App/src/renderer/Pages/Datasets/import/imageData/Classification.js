import {
  Box,
  Typography,
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function Classification() {
  const { t } = useTranslation();
  const [labels, setLabels, classes, page] = useOutletContext();
  const handleChangeLabel = (event, value) => {
    let newLabels = [...labels];
    newLabels[page - 1] = event.target.value;
    setLabels(newLabels);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
      }}
    >
      <FormControl
        sx={{
          width: '50%',
          marginLeft: 'auto',
        }}
      >
        <FormLabel sx={{ color: 'text.main' }}>Classes</FormLabel>
        <RadioGroup onChange={handleChangeLabel}>
          {classes.map((item) => (
            <FormControlLabel
              checked={labels[page - 1] === item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <TextField
        sx={{
          marginLeft: 'auto',
          width: '50%',
        }}
      />
    </Box>
  );
}

export default Classification;
