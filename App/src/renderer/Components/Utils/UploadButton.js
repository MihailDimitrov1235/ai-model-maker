import {
  Box,
  LinearProgress,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTranslation } from 'react-i18next';
function UploadButton({
  text,
  onClick,
  disabled = false,
  icon = 'folder',
  error = false,
  uploadItem = 0,
}) {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: '100%', aspectRatio: '11/6' }}>
      <Button
        disabled={disabled}
        onClick={onClick}
        sx={{
          width: '100%',
          height: '100%',
          border: 'dashed 1px red',
          borderColor: error
            ? 'error'
            : disabled
            ? 'border.main'
            : 'primary.main',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {uploadItem > 0 ? (
          <Typography fontSize={'3.2rem'}>{uploadItem}</Typography>
        ) : icon == 'folder' ? (
          <DriveFolderUploadIcon
            color={error ? 'error' : ''}
            sx={{
              fontSize: '80px',
            }}
          />
        ) : (
          <UploadFileIcon
            color={error ? 'error' : ''}
            sx={{
              fontSize: '80px',
            }}
          />
        )}

        <Typography color={error ? 'error' : ''}>{text}</Typography>
      </Button>
      <Box
        sx={{
          height: '50px',
        }}
      >
        {error && <Typography color={'error'}>{error}*</Typography>}
      </Box>
    </Box>
  );
}

export default UploadButton;
