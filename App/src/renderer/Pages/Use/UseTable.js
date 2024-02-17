import { useEffect, useRef, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function UseTable() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [model, setModel] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [tab, setTab] = useState('test');

  const refs = useRef([]);

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  const handleTest = () => {
    console.log(refs.current);
    let formData = {};
    dataset.header
      .filter((input) => input != model.target)
      .forEach((input, idx) => {
        console.log(input);
        console.log(refs.current[idx].current.value);
        formData[input] = refs.current[idx].current.value;
      });
    console.log('Form Data:', formData);
    window.electronAPI.testTableModel(formData);
  };

  const fetchData = async () => {
    const mod = await window.electronAPI.getModel({ model: id, type: 'table' });
    console.log(mod);
    setModel(mod);
    const ds = await window.electronAPI.getDatasetInfo({ name: mod.dataset });
    console.log(ds);
    setDataset(ds);
  };

  useEffect(() => {
    window.electronAPI.prepareTableModelForUse(id);
    fetchData();
  }, [id]);

  return (
    <Box>
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'border.main' }}
        value={tab}
        onChange={handleChangeTab}
      >
        <Tab value={'test'} label={t('test-model')} />
        <Tab value={'integrate'} label={t('integrate-model')} />
      </Tabs>
      {dataset ? (
        <>
          <Box
            display={tab == 'test' ? 'flex' : 'none'}
            sx={{ flexDirection: 'column', width: '100%', gap: 3, mt: 3 }}
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
                alignItems: 'center',
              }}
            >
              <Typography sx={{ flex: 1, textAlign: 'right' }}>
                {t('result')}
              </Typography>
              <TextField disabled>{t('test')}</TextField>
            </Box>
          </Box>
          <Box display={tab == 'integrate' ? 'flex' : 'none'}>integrate</Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
