import { Button, Box, Alert, AlertTitle } from '@mui/material';
import { useState, forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const CustomSnackbar = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { closeSnackbar } = useSnackbar();
  const { id, alertVariant, title, message, buttons, persist } = props;
  const handleClose = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);
  return (
    <SnackbarContent ref={ref}>
      <Alert
        onClose={persist ? handleClose : undefined}
        severity={alertVariant}
        sx={{
          width: '400px',
          '.MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle>{t(title)}</AlertTitle>
        {t(message)}
        {buttons && (
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
                {btn.link && (
                  <Button
                    key={idx}
                    variant={btn.variant ? btn.variant : 'main'}
                    onClick={() => navigate(btn.link)}
                  >
                    {btn.text}
                  </Button>
                )}
                {/* {btn.downloadLink ? (
                  <Button
                    variant={btn.variant ? btn.variant : 'main'}
                    onClick={btn.handleClick}
                  >
                    <a
                      href={btn.downloadLink}
                      download
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {btn.text}
                    </a>
                  </Button>
                ) : (
                  <Button
                    key={idx}
                    variant={btn.variant ? btn.variant : 'main'}
                    onClick={btn.handleClick}
                  >
                    {btn.text}
                  </Button>
                )} */}
              </Box>
            ))}
          </Box>
        )}
      </Alert>
    </SnackbarContent>
  );
});

CustomSnackbar.displayName = 'CustomSnackbar';

export default CustomSnackbar;

// export default function Snack({
//   open,
//   setOpen = (open) => {},
//   message = '',
//   title = '',
//   variant = 'info',
//   duration = false,
//   buttons = [],
// }) {
//   return (
//     <Snackbar
//       open={open}
//       onClose={() => {}}
//       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       sx={{ width: '400px' }}
//     >
//       <Alert
// onClose={() => {
//   setOpen(!open);
// }}
//         severity={variant}
//         sx={{
//           width: '100%',
//           '.MuiAlert-message': {
//             width: '100%',
//           },
//         }}
//       >
//         <AlertTitle>{title}</AlertTitle>
//         {message}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'right',
//             alignItems: 'center',
//             mt: 2,
//             gap: 2,
//           }}
//         >
//           {buttons.map((btn, idx) => (
//             <Box key={idx}>
//             {btn.downloadLink?
//               <Button
//               variant={btn.variant ? btn.variant : 'main'}
//               onClick={btn.handleClick}
//             >
//             <a href={btn.downloadLink} download style={{ color:'inherit', textDecoration: 'none'}}>
//               {btn.text}
//             </a>
//             </Button>
//             :
//             <Button
//               key={idx}
//               variant={btn.variant ? btn.variant : 'main'}
//               onClick={btn.handleClick}
//             >
//               {btn.text}
//             </Button>
//             }
//             </Box>
//           ))}
//         </Box>
//       </Alert>
//     </Snackbar>
//   );
// }
