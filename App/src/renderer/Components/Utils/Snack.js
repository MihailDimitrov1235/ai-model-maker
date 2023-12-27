import {
  Snackbar,
  Alert,
  AlertTitle,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Snack({
  open,
  setOpen = (open) => {},
  message = '',
  title = '',
  variant = 'info',
  duration = false,
  buttons = [],
}) {
  return (
    <Snackbar
      open={open}
      onClose={() => {}}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{ width: '400px' }}
    >
      <Alert
        onClose={() => {
          setOpen(!open);
        }}
        severity={variant}
        sx={{
          width: '100%',
          '.MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            mt: 2,
            gap: 2,
          }}
        >
          {buttons.map((btn, idx) => (
            <Box key={idx}>
            {btn.downloadLink?
              <Button
              variant={btn.variant ? btn.variant : 'main'}
              onClick={btn.handleClick}
            >
            <a href={btn.downloadLink} download style={{ color:'inherit', textDecoration: 'none'}}>
              {btn.text}
            </a>
            </Button>
            :
            <Button
              key={idx}
              variant={btn.variant ? btn.variant : 'main'}
              onClick={btn.handleClick}
            >
              {btn.text}
            </Button>
            }
            </Box>
          ))}
        </Box>
      </Alert>
    </Snackbar>
  );
}
