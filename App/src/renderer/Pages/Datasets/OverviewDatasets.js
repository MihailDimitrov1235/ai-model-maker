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
  import { useEffect, useState } from 'react';
  
  function OverviewDatasets() {
   
  
    const handleClickLabel = () => {
      window.electronAPI.selectLabel();
    };
    const { t } = useTranslation();
    return (
      <Box
        sx={{
          display: 'inline',
        }}
      >
        <h2>{t('create-image-labels')}</h2> 
        <Box
            sx={{
                marginTop: '5%',
                borderRadius: '16px',
    
                color: 'white',
            }}
        >
            <Box>
                <Link to="../ontact"><Button>{t('overview-button')}</Button></Link>
                    
                    <Button>{t('finish-button')}</Button>
            </Box>
                
                
        </Box>
      </Box>
    );
  }
  
  export default OverviewDatasets;
  