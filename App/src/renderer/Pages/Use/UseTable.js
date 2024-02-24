import { useEffect, useRef, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TestTable from './TestTable';
import IntegrateTable from './IntegrateTable';

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

  const fetchData = async () => {
    const mod = await window.electronAPI.getModel({ model: id, type: 'table' });
    setModel(mod);
    const ds = await window.electronAPI.getDatasetInfo({ name: mod.dataset });
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
          <TestTable
            dataset={dataset}
            model={model}
            refs={refs}
            display={tab == 'test' ? 'flex' : 'none'}
          />
          <Box display={tab == 'integrate' ? 'flex' : 'none'}>
            <IntegrateTable dataset={dataset} model={model} />
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
