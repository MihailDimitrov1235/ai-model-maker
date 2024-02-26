import { Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import CodeBlock from '../../../Components/CodeBlock';

export default function IntegrateTable({ dataset, model }) {
  let data = {};
  dataset.header.forEach((column, index) => {
    if (column == model.target) {
      return;
    }
    data[column] = 'your-value';
  });
  const { t } = useTranslation();
  const [tab, setTab] = useState('python');
  const handleChangeTab = (event, value) => {
    setTab(value);
  };
  const handleSaveModel = async () => {
    window.electronAPI.saveModel();
  };

  const pythonCode = `from tensorflow.keras.models import load_model
import numpy as np

# Load the Keras model
model = load_model('model.keras')

# Define a prediction function
def predict(data):
    converted_dict = {
        key: float(value) if value.replace(".", "", 1).isdigit() else value
        for key, value in data.items()
    }
    input_dict = {
        name: convert_to_tensor([value]) for name, value in converted_dict.items()
    }
    predictions = model.predict(input_dict, verbose=0)
    return predictions.tolist()

# Example usage:
data = ${JSON.stringify(data, null, 2)}
result = predict(data)
print(result)
`;
  return (
    <Box
      sx={{
        width: '100%',
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        pt: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 3,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Typography>{t('integrate-table-text')}</Typography>
        <Button onClick={handleSaveModel} variant="contrast">
          {t('save-model')}
        </Button>
      </Box>
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'border.main' }}
        value={tab}
        onChange={handleChangeTab}
      >
        <Tab value={'python'} label={t('python')} />
      </Tabs>

      <Box display={tab == 'python' ? 'flex' : 'none'} sx={{ width: '100%' }}>
        <CodeBlock code={pythonCode} language={'python'} />
      </Box>
    </Box>
  );
}
