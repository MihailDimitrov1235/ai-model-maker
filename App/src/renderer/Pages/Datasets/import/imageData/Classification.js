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
  const [labels, setLabels, classes, page, value, setValue] =
    useOutletContext();

  console.log(labels);
  const handleChangeLabel = (event, value) => {
    //setLabels(value);
    let newLabels = [...labels];
    newLabels[page - 1] = event.target.value;
    setValue(event.target.value);
    setLabels(newLabels);
    console.log(event.target.value);
    console.log(page);
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
          marginLeft: 'auto',
        }}
      >
        <FormLabel sx={{ color: 'text.main' }}>Classes</FormLabel>
        <RadioGroup value={labels[page - 1]} onChange={handleChangeLabel}>
          {classes.map((item) => (
            <FormControlLabel value={item} control={<Radio />} label={item} />
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
