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
            hasHeaders = true;
          }
        }
      }

      if (hasHeaders) {
        let idxs = [];
        let newDatasetHeaders = [];
        for (let i = 0; i < dataset.header.length; i++) {
          if (dataset.header[i] != model.target) {
            newDatasetHeaders.push(dataset.header[i]);
          }
        }

        for (let i = 0; i < newDatasetHeaders.length; i++) {
          for (let col = 0; col < response.data[0].length; col++) {
            if (newDatasetHeaders[i] == response.data[0][col]) {
              idxs.push(col);
            }
          }
        }

        let newData = [];
        for (let row = 1; row < response.data.length; row++) {
          let newRow = [];
          for (let col = 0; col < idxs.length; col++) {
            newRow.push(response.data[row][idxs[col]]);
          }
          newData.push(newRow);
        }
        console.log(newData);
        setData(newData);
      } else {
        if (response.data[0].length == dataset.header.length - 1) {
          setData(response.data);
        } else {
          window.electronAPI.createSnackbar({
            message: 'data-does-not-match-message',
            title: 'data-does-not-match-title',
            alertVariant: 'error',
            autoHideDuration: 3000,
          });
        }
      }
    } else {
      window.electronAPI.createSnackbar({
        message: 'error-opening-file-message',
        title: 'error-opening-file-title',
        alertVariant: 'error',
        autoHideDuration: 3000,
      });
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
