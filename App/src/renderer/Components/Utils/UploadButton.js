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

function UploadButton({ text, onClick, disabled = false, icon = 'folder' }) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: '100%',
        aspectRatio: '2/1',
        border: 'dashed 1px red',
        borderColor: disabled ? 'border.main' : 'primary.main',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {icon == 'folder' ? (
        <DriveFolderUploadIcon
          sx={{
            fontSize: '80px',
          }}
        />
      ) : (
        <UploadFileIcon
          sx={{
            fontSize: '80px',
          }}
        />
      )}

      <Typography>{text}</Typography>
    </Button>
  );
}

export default UploadButton;
