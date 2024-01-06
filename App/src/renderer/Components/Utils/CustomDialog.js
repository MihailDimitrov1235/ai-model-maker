import {
    Box,
    LinearProgress,
    Dialog,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Button,
  } from '@mui/material';

function CustomDialog({open, title, text, buttons, loading=true}) {
  return (
    <Dialog open={open} fullWidth sx={{}}>
        <DialogTitle sx={{p:3, pb:0, bgcolor: "background.main", color: "text.main" }}>
          {title}
        </DialogTitle>
        <DialogContentText
          sx={{ p: 3, bgcolor: "background.main", color: "text.main" }}
        >
          
          <Box display="flex" flexDirection={'column'} gap={2}>
            {text}
            {loading && <LinearProgress/>}
          </Box>

        </DialogContentText>
        <DialogActions
          sx={{ bgcolor: "background.main", py: 2, px: 3, gap: 5 }}
        >
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
  )
}

export default CustomDialog