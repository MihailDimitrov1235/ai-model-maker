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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Classification() {
  const { t } = useTranslation();
  const [labels, setLabels, classes, setClasses, page] = useOutletContext();
  const [inputValue, setInputValue] = useState('');
  console.log(classes);
  const handleChangeLabel = (event, value) => {
    let newLabels = [...labels];
    newLabels[page - 1] = event.target.value;
    setLabels(newLabels);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddValue = () => {
    if (inputValue.trim() !== '') {
      setClasses([...classes, inputValue]);
      setLabels([...labels, inputValue]);
      setInputValue('');
    }
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
        label={t('enter-label')}
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          marginLeft: 'auto',
          width: '50%',
        }}
      />
      <Button
        sx={{
          marginTop: 3,
          marginLeft: 'auto',
          width: '50%',
          justifyContent: 'space-around',
        }}
        variant="contrast"
        onClick={handleAddValue}
      >
        <AddCircleOutlineIcon />
        {t('add-label')}
      </Button>
    </Box>
  );
}

export default Classification;
