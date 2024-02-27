import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TestTableUsingFile({ dataset, model, display }) {
  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'));
  const [data, setData] = useState(null);

  const handleSelectFile = async () => {
    const response = await window.electronAPI.selectTabularFile();
    setFile(response.file);
    if (!response.error) {
      let set = new Set(dataset.header);
      set.delete(model.target);

      let setCopy = new Set(set);
      let hasHeaders = false;
      for (let col = 0; col < response.data[0].length; col++) {
        if (setCopy.has(response.data[0][col])) {
          setCopy.delete(response.data[0][col]);
          if (setCopy.size == 0) {
            hasHeaders = treu;
          }
        }
      }

      if (hasHeaders) {
        let newData = [];

        for (let row = 0; row < response.data.length; row++) {
          let newRow = [];
          for (let col = 0; col < response.data[0].length; col++) {
            if (set.has(response.data[0][col])) {
              newRow.push(response.data[row][col]);
              set.delete(response.data[0][col]);
            }
          }
          newData.push(newRow);
        }
        setData(newData);
      } else {
        if (response.data[0].length == dataset.header.length - 1) {
          setData(response.data);
        }
      }
    }
  };

  return (
    <Box sx={{ display: display }}>
      <TextField
        sx={{ input: { cursor: 'pointer' }, flex: 1 }}
        variant="outlined"
        value={file}
        onClick={handleSelectFile}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
}
