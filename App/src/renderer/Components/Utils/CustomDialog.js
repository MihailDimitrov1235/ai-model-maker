import {
  Box,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';

function CustomDialog({ open, setOpen, title, text, buttons, loading = true }) {
  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} fullWidth onClose={handleClose}>
      <DialogTitle
        sx={{ p: 3, pb: 0, bgcolor: 'background.main', color: 'text.main' }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{ p: 3, bgcolor: 'background.main', color: 'text.main' }}
      >
        <Box display="flex" flexDirection={'column'} gap={2}>
          {text}
          {loading && <LinearProgress />}
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: 'background.main', py: 2, px: 3, gap: 5 }}>
        {buttons.map((btn, idx) => (
          <Button
            key={idx}
            variant={btn.variant ? btn.variant : 'main'}
            onClick={btn.handleClick}
          >
            {btn.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
