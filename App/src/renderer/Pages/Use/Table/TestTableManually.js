import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import { useState, createRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
export default function TestTableManually({ dataset, model, refs, display }) {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.electronAPI.handleSetTestResult((event, value) => {
      setResult(value[0]);
    });

    return () => {
      window.electronAPI.removeListener('set-test-result');
    };
  }, []);
  const handleTest = () => {
    let formData = {};
    let error = false;
    dataset.header
      .filter((input) => input != model.target)
      .forEach((input, idx) => {
        let val = refs.current[idx].current.value;
        if (val == undefined || val == null || val == '') {
          error = true;
          return;
        }
        formData[input] = val;
      });
    if (error) {
      window.electronAPI.createSnackbar({
        message: 'values-missing-message',
        title: 'values-missing-title',
        alertVariant: 'error',
        autoHideDuration: 3000,
      });
    } else {
      window.electronAPI.testTableModel(formData);
    }
  };
  return (
    <Box
      sx={{
        display: display,
        flexDirection: 'column',
        width: '100%',
        gap: 3,
        mt: 3,
      }}
    >
      {dataset && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {dataset.header
              .filter((input) => input != model.target)
              .map((input, colIndex) => {
                if (input == model.target) {
                  return;
                }
                const type = dataset.selectedTypes[input];
                refs.current[colIndex] = refs.current[colIndex] || createRef();
                return (
                  <Box
                    key={colIndex}
                    sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
                  >
                    <Typography sx={{ flex: 1, textAlign: 'right' }}>
                      {input}
                    </Typography>
                    {type.type == 'categorical' && (
                      <Autocomplete
                        sx={{ flex: 5 }}
                        options={type.values}
                        getOptionLabel={(option) => option.toString()}
                        isOptionEqualToValue={(option, value) =>
                          option.toString() === value.toString()
                        }
                        renderInput={(params) => (
                          <TextField
                            inputRef={refs.current[colIndex]}
                            {...params}
                            label={input}
                          />
                        )}
                      />
                    )}
                    {type.type == 'binary' && (
                      <Autocomplete
                        sx={{ flex: 5 }}
                        options={type.values}
                        getOptionLabel={(option) => option.toString()}
                        isOptionEqualToValue={(option, value) =>
                          option.toString() === value.toString()
                        }
                        renderInput={(params) => (
                          <TextField
                            inputRef={refs.current[colIndex]}
                            {...params}
                            label={input}
                          />
                        )}
                      />
                    )}
                    {type.type == 'numeric' && (
                      <TextField
                        inputRef={refs.current[colIndex]}
                        sx={{ flex: 5 }}
                        type="number"
                        inputProps={{
                          min: type.min >= 0 ? 0 : null,
                          step: 1,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <Button variant={'contrast'} onClick={handleTest}>
              {t('test')}
            </Button>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 3,
              alignItems: 'start',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
              sx={{ flex: 1, textAlign: 'left', width: '100%' }}
            >
              {t('result')}
            </Typography>
            {dataset.selectedTypes[model.target] && (
              <>
                {dataset.selectedTypes[model.target].type == 'binary' && (
                  <>
                    <Box display={'flex'} gap={3} alignItems={'center'}>
                      <Typography sx={{ flex: 1, textAlign: 'right' }}>
                        {dataset.selectedTypes[model.target].values[0]}
                      </Typography>
                      <TextField
                        disabled
                        value={result ? `${(result[0] * 100).toFixed(2)}%` : ''}
                      />
                    </Box>
                    <Box display={'flex'} gap={3} alignItems={'center'}>
                      <Typography sx={{ flex: 1, textAlign: 'right' }}>
                        {dataset.selectedTypes[model.target].values[1]}
                      </Typography>
                      <TextField
                        disabled
                        value={
                          result ? `${((1 - result[0]) * 100).toFixed(2)}%` : ''
                        }
                      />
                    </Box>
                  </>
                )}

                {dataset.selectedTypes[model.target].type == 'categorical' && (
                  <>
                    <Box display={'flex'} gap={3} alignItems={'center'}>
                      <Typography sx={{ flex: 1, textAlign: 'right' }}>
                        {t('none')}
                      </Typography>
                      <TextField
                        disabled
                        value={result ? `${(result[0] * 100).toFixed(2)}%` : ''}
                      />
                    </Box>
                    {dataset.selectedTypes[model.target].values.map(
                      (val, idx) => (
                        <Box
                          key={idx}
                          display={'flex'}
                          gap={3}
                          alignItems={'center'}
                        >
                          <Typography sx={{ flex: 1, textAlign: 'right' }}>
                            {val}
                          </Typography>
                          <TextField
                            disabled
                            value={
                              result
                                ? `${(result[idx + 1] * 100).toFixed(2)}%`
                                : ''
                            }
                          />
                        </Box>
                      ),
                    )}
                  </>
                )}
                {dataset.selectedTypes[model.target].type == 'numeric' && (
                  <TextField
                    disabled
                    value={result ? `${result[0].toFixed(2)}` : ''}
                  />
                )}
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
