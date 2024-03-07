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
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

function Classification() {
  const { t } = useTranslation();
  const [labels, setLabels, classes, setClasses, page] = useOutletContext();
  const [inputValue, setInputValue] = useState('');
  const handleChangeLabel = (event, value) => {
    let newLabels = [...labels];
    newLabels[page - 1] = event.target.value;
    setLabels(newLabels);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddValue = () => {
    let newClasses = new Set();
    //setClasses(Array.from(classSet));
    if (inputValue.trim() !== '') {
      console.log('inputValue');
      console.log(inputValue);
      newClasses = classes;
      console.log(newClasses);
      newClasses.add(inputValue);
      setClasses(newClasses);

      setInputValue('');
    }
  };
  const handleRemoveClass = (item) => {
    let removedClass = classes;
    removedClass.delete(item);
    setClasses(removedClass);
  };
  return (
    <Box display={'flex'} justifyContent={'right'} height={'100%'}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'right',
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <FormControl>
          <FormLabel sx={{ color: 'text.main', fontSize: '18px' }}>
            {t('classes')}
          </FormLabel>
          <RadioGroup onChange={handleChangeLabel}>
            {Array.from(classes).map((item, index) => (
              <Box
                key={index}
                display={'flex'}
                justifyContent={'space-between'}
                sx={{ overflow: 'hidden', width: '100%', pl: 2 }}
              >
                <FormControlLabel
                  checked={labels[page - 1] === item}
                  value={item}
                  control={<Radio />}
                  label={<Tooltip title={item}>{item}</Tooltip>}
                  sx={{ maxWidth: '100%', overflow: 'hidden' }}
                />
                <IconButton onClick={() => handleRemoveClass(item)}>
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
        <TextField
          sx={{ mt: 3 }}
          label={t('enter-label')}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          sx={{
            mt: 3,
          }}
          variant="contrast"
          onClick={handleAddValue}
          startIcon={<AddCircleOutlineIcon />}
        >
          {t('add-classes')}
        </Button>
      </Box>
    </Box>
  );
}

export default Classification;
