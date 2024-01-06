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

function UploadButton({ text, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: '100%',
        height: '200px',
        border: 'dashed 1px red',
        borderColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DriveFolderUploadIcon
        sx={{
          fontSize: '80px',
        }}
      />
      <Typography>{text}</Typography>
    </Button>
  );
}

export default UploadButton;
