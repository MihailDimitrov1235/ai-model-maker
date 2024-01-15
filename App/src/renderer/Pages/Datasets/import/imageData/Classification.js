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
  const [labels, setLabels] = useOutletContext();

  console.log(labels);
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
        <RadioGroup>
          {labels.map((item) => (
            <FormControlLabel value={item} control={<Radio />} label={item} />
          ))}
          {labels}
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
