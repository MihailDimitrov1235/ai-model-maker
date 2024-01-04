import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import UploadButton from '../../../Components/Utils/UploadButton';
import { useTranslation } from 'react-i18next';

function ImportImage() {
  const handleClick = () => {
    window.electronAPI.selectImageFolder();
  };
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'inline',
      }}
    >
      <h1>Create image dataset</h1>
      <Box
        sx={{
          marginTop: '5%',
          borderRadius: '16px',

          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormControl sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}>
            <InputLabel>{t("type")}</InputLabel>
            <Select label={'type'} sx={{ minWidth: '200px' }}>
              <MenuItem value={'classification'}>{t("image-classification")}</MenuItem>
              <MenuItem value={'detection'}>{t("object-detection")}</MenuItem>
              <MenuItem value={'captioning'}>{t("captioning")}</MenuItem>
            </Select>

            <TextField variant="outlined" placeholder="Width" />
            <TextField variant="outlined" placeholder="Height" />
          </FormControl>
          <Box>
            <Typography color={'text.main'}>{t("no-labels")}</Typography>
            <Button variant="contrast">{t("create-labels")}</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex',
          gap: 3,
          mt: 4
          
      }}>
          <UploadButton text={t("choose-image-folder")}/>
          <UploadButton text={t("choose-labels")}/>
        </Box>
        
        <Button onClick={() => {handleClick}}>{t("select-folder")}</Button>
      </Box>
    </Box>
  );
}

export default ImportImage;
