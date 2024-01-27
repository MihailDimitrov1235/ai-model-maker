import {
  MenuItem,
  Box,
  Select,
  TextField,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

export default function LayersDisplay({
  layers,
  setLayers,
  possibleLayers,
  layersError,
}) {
  const { t } = useTranslation();

  const handleAddLayer = () => {
    let newLayers = [...layers];
    newLayers.unshift({ type: 'dense', nodes: '64', activation: 'relu' });
    console.log(newLayers);
    setLayers(newLayers);
  };

  const handleDeleteLayer = (index) => {
    let newLayers = [...layers];
    newLayers.splice(index, 1);
    setLayers(newLayers);
  };

  const handleGoUp = (index) => {
    let newLayers = [...layers];
    let temp = newLayers[index];
    newLayers[index] = newLayers[index - 1];
    newLayers[index - 1] = temp;
    setLayers(newLayers);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
        <Box>
          <Typography variant="h6">{t('hidden-layers')}</Typography>
          <Typography color={'error'}>{layersError}</Typography>
        </Box>
        <Button onClick={handleAddLayer} startIcon={<AddIcon />}>
          {t('add-layer')}
        </Button>
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        {layers.map((layer, index) => (
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} gap={3}>
              <FormControl>
                <InputLabel>{t('type')}</InputLabel>
                <Select
                  label={t('type')}
                  sx={{ width: '200px' }}
                  value={layer.type}
                  onChange={(event) => {
                    let newLayers = [...layers];
                    const selectedValue = event.target.value;
                    const selectedObject = possibleLayers.find(
                      (item) => item.type === selectedValue,
                    );
                    newLayers[index] = selectedObject;
                    setLayers(newLayers);
                  }}
                >
                  {possibleLayers.map((item) => (
                    <MenuItem value={item.type}>{t(item.type)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {(layer.nodes || layer.nodes == 0) && (
                <TextField
                  label={t('nodes')}
                  sx={{ width: '200px' }}
                  value={layer.nodes}
                  type="number"
                  onChange={(event) => {
                    let newLayers = [...layers];

                    newLayers[index].nodes =
                      event.target.value < 0
                        ? -event.target.value
                        : event.target.value % 1 != 0
                        ? parseInt(event.target.value)
                        : event.target.value;

                    setLayers(newLayers);
                  }}
                />
              )}

              {layer.activation && (
                <FormControl>
                  <InputLabel>{t('activation-function')}</InputLabel>
                  <Select
                    label={t('activation-function')}
                    sx={{ width: '200px' }}
                    value={layer.activation}
                    onChange={(event) => {
                      let newLayers = [...layers];
                      newLayers[index].activation = event.target.value;
                      setLayers(newLayers);
                    }}
                  >
                    {['relu', 'linear'].map((func) => (
                      <MenuItem value={func}>{t(func)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {layer.rate && (
                <TextField
                  label={t('rate')}
                  sx={{ width: '200px' }}
                  value={layer.rate}
                  type="number"
                  inputProps={{
                    step: 0.1,
                  }}
                  onChange={(event) => {
                    let newLayers = [...layers];

                    newLayers[index].rate =
                      event.target.value < 0
                        ? newLayers[index].rate
                        : event.target.value >= 1
                        ? newLayers[index].rate
                        : event.target.value;

                    setLayers(newLayers);
                  }}
                />
              )}
            </Box>
            <Box display={'flex'}>
              <IconButton
                disabled={index == 0}
                onClick={() => handleGoUp(index)}
                sx={{ width: '56px' }}
              >
                <KeyboardDoubleArrowUpIcon />
              </IconButton>
              <IconButton
                disabled={index == layers.length - 1}
                onClick={() => handleGoUp(index + 1)}
                sx={{ width: '56px', mr: 6 }}
              >
                <KeyboardDoubleArrowDownIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteLayer(index)}
                color="error"
                sx={{ width: '56px' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
