import { Box, Button, TextField, Typography } from '@mui/material';
import { Component, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../../Components/Utils/CustomTable';

function ImportTabular() {
  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'));
  const [data, setData] = useState(null);
  const [name, setName] = useState("");

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
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      height={'100%'}
      overflow={'visible'}
      gap={3}
    >
      <Box display={'flex'} justifyContent={'space-between'} gap={3}>
        <TextField
          placeholder={t("name-dataset")}
          sx={{ flex: 1 }} />
        <TextField
          sx={{ input: { cursor: 'pointer' }, flex: 1 }}
          variant="outlined"
          value={file}
          onClick={handleClick}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      {data && <CustomTable data={data} />}
    </Box>
  );
}

export default ImportTabular;
