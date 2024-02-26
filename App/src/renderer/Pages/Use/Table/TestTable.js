import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TestTableManually from './TestTableManually';
import TestTableUsingFile from './TestTableUsingFile';

export default function TestTable({ dataset, model, refs, display }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState('manual');

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  return (
    <Box
      sx={{
        display: display,
        flexDirection: 'column',
        width: '100%',
        gap: 3,
        mt: 3,
        px: 3,
      }}
    >
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'border.main' }}
        value={tab}
        onChange={handleChangeTab}
      >
        <Tab value={'manual'} label={t('test-manually')} />
        <Tab value={'file'} label={t('test-using-file')} />
      </Tabs>
      <TestTableManually
        dataset={dataset}
        model={model}
        refs={refs}
        display={tab == 'manual' ? 'flex' : 'none'}
      />
      <TestTableUsingFile
        dataset={dataset}
        model={model}
        display={tab == 'file' ? 'flex' : 'none'}
      />
    </Box>
  );
}
