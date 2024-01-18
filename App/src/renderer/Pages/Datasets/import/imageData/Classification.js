import {
  Box,
  Typography,
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, Fragment } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

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
        justifyContent: 'right',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
        }}
      >
        <FormControl>
          <FormLabel sx={{ color: 'text.main', fontSize: '20px' }}>
            {t('categories')}
          </FormLabel>
          <RadioGroup sx={{ mt: 3 }} onChange={handleChangeLabel}>
            {classes.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflow: 'hidden',
                  maxWidth: '100%',
                }}
              >
                <FormControlLabel
                  sx={{
                    m: 0,
                    maxWidth: '85%',
                    overflow: 'hidden',
                  }}
                  checked={labels[page - 1] === item}
                  value={item}
                  control={<Radio />}
                  label={
                    <Tooltip followCursor placement="top" title={item}>
                      {item}
                    </Tooltip>
                  }
                />
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
        <TextField sx={{ mt: 3 }} />
        <Button sx={{ mt: 3 }} variant="contrast">
          {t('add-category')}
        </Button>
      </Box>
    </Box>
  );
}

export default Classification;
