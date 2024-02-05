import {
  Box,
  Typography,
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Pagination,
  Card,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

function CreateLabels() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [labels, setLabels] = useState([]);
  const [imagesPath, setImagesPath] = useState([]);
  const [queryParameters] = useSearchParams();

  const [imageSrc, setImageSrc] = useState('');

  //console.log(images);
  const [page, setPage] = useState(1);
  const [classes, setClasses] = useState(new Set());

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const fetchImage = async () => {
    if (imagesPath.length > 0) {
      const newImage = await window.electronAPI.getImage({
        path: imagesPath[page - 1],
      });
      setImageSrc(newImage);
    }
  };

  useEffect(() => {
    // Send a request to the main process with the absolute path

    setImagesPath(
      JSON.parse(decodeURIComponent(queryParameters.get('images'))),
    );
    console.log(JSON.parse(decodeURIComponent(queryParameters.get('images'))));
  }, []);

  useEffect(() => {
    // Send a request to the main process with the absolute path
    fetchImage();
  }, [page, imagesPath]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGoBack = () => {
    if (labels.length == imagesPath.length) {
      navigate(
        `/data/import/image/?labels=${encodeURIComponent(
          JSON.stringify(labels),
        )}&images=${encodeURIComponent(
          JSON.stringify(imagesPath),
        )}&selectedValue=${queryParameters.get('selectedValue')}`,
      );
    } else {
      alert('no-selected-all-labels');
    }
  };

  return (
    <Box
      sx={{
        display: 'inline',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '16px',
          color: 'white',
        }}
      >
        <Pagination
          count={imagesPath.length}
          page={page}
          onChange={handleChangePage}
        />

        <Box display={'flex'} gap={3}>
          <Button variant="contrast">{t('delete-image')}</Button>
          <Button variant="contrast" onClick={handleGoBack}>
            {t('finish')}
          </Button>
        </Box>
      </Box>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
          p: 3,
        }}
      >
        <Box
          sx={{
            width: '50%',
            alignContent: 'center',
          }}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </Box>
        <Box sx={{ width: '50%', p: 3 }}>
          {<Outlet context={[labels, setLabels, classes, setClasses, page]} />}
        </Box>
      </Card>
    </Box>

    // <Box display={'flex'} justifyContent={'right'} height={'100%'}>
    //   <Box
    //     sx={{
    //       width: '100%',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'right',
    //       height: '100%',
    //       overflow: 'scroll',
    //     }}
    //   >
    //     <Box>
    //       <Typography sx={{ color: 'text.main', fontSize: '18px' }}>
    //         {t('add-labels')}
    //       </Typography>
    //       <Box sx={{ mt: 2 }}>
    //         {labels.map((item) => (
    //           <Box
    //             display={'flex'}
    //             justifyContent={'space-between'}
    //             sx={{ overflow: 'hidden', width: '100%', pl: 2 }}
    //           >
    //             <FormControlLabel
    //               value={item}
    //               control={<Radio />}
    //               label={<Tooltip title={item}>{item}</Tooltip>}
    //               sx={{ maxWidth: '100%', overflow: 'hidden' }}
    //             />

    //             <IconButton onClick={() => handleRemoveClass(item)}>
    //               <ClearIcon />
    //             </IconButton>
    //           </Box>
    //         ))}
    //       </Box>
    //     </Box>
    //     <TextField
    //       sx={{ mt: 3 }}
    //       label={t('enter-label')}
    //       value={inputValue}
    //       onChange={handleInputChange}
    //     />
    //     <Button
    //       sx={{
    //         mt: 3,
    //         width: '25%',
    //       }}
    //       variant="contrast"
    //       onClick={handleAddValue}
    //       startIcon={<AddCircleOutlineIcon />}
    //     >
    //       {t('add-label')}
    //     </Button>
    //     <Button
    //       sx={{
    //         mt: 3,
    //         width: '25%',
    //       }}
    //       variant="contrast"
    //       onClick={handleGoBack}
    //     >
    //       {t('go-back')}
    //     </Button>
    //   </Box>
    // </Box>
  );
}

export default CreateLabels;
