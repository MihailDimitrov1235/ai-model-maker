import { Box, Button, TextField } from '@mui/material';
import { Component, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../../Components/Utils/CustomTable';

function ImportTabular() {
  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'));
  const [data, setData] = useState(null);

  useEffect(() => {
    window.electronAPI.handleSetTabularFile((event, value) => {
      if (!value.canceled) {
        setFile(value.filePaths);
      }
    });
    window.electronAPI.handleSetTabularFileData((event, value) => {
      if (!value.error) {
        setData(value.data);
      }
      console.log(value);
    });
  }, []);

  const handleClick = () => {
    window.electronAPI.selectTabularFile();
  };

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} gap={3}>
        <TextField
          sx={{ input: { cursor: 'pointer' } }}
          variant="outlined"
          value={file}
          fullWidth
          onClick={handleClick}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          onClick={handleClick}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            px: 2,
          }}
        >
          {t('select-file')}
        </Button>
      </Box>
      {data && <CustomTable data={data} />}
    </Box>
  );
}

export default ImportTabular;
