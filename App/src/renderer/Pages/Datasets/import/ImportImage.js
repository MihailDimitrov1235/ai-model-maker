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
import { Link, useNavigate } from 'react-router-dom';
import { width } from '@mui/system';
 
function ImportImage() {
  const { t, i18n } = useTranslation();
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [labels, setLabels] = useState([]);
  const [uploadLabelsError, setUploadLabelsError] = useState(1);
  const [uploadImagesError, setUploadImagesError] = useState(1);
  const [selectedValue, setSelectedValue] = useState('');
  const [textUploadImages, setTextUploadImages] = useState(1);
  const [textUploadLabels, setTextUploadLabels] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeigth] = useState(0);
  const [nameDataset, setNameDataset] = useState('');
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [classes, setClasses] = useState([]);
 
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
 
    // You can perform additional actions based on the selected value here
    console.log('Selected value:', value);
  };
 
  useEffect(() => {
    //Setting images variable
    window.electronAPI.handleSetImageFolder((event, value) => {
      if (value.data && value.data.length > 0) {
        setImages(value.data);
        setUploadImagesError(1);
        setTextUploadImages(2);
      } else {
        setUploadImagesError(2);
      }
    });
    window.electronAPI.handleSetImageLabel((event, value) => {
      if (!value.canceled && value.data != '') {
        //setLabels(value.data);
        console.log('LabelOT SETVANE=' + value.data);
        let labelsFromFile = JSON.stringify(value.data)
          .replace(/["\[\]]/g, '')
          .split('\\r\\n');
        let newLabel = [];
        let classSet = new Set();
        labelsFromFile.map((item) => {
          if (item != '') {
            newLabel.push(item);
            classSet.add(item);
          }
        });
        console.log(classSet);
        setClasses(Array.from(classSet));
        console.log(Array.from(classSet));
        setLabels(newLabel);
 
        setUploadLabelsError(1);
        setTextUploadLabels(2);
      } else {
        setUploadLabelsError(2);
      }
    });
  }, []);
  useEffect(() => {
    // Check labels
    if (images && labels && images.length > 0 && labels.length > 0) {
      setShowButton(true);
    }
  }, [images, labels]);
 
  const handleClick = () => {
    window.electronAPI.selectImageFolder();
  };
 
  const handleClickLabel = () => {
    window.electronAPI.selectLabel();
  };
  const handleInputChangeWidth = (e) => {
    if(/^\d+$/.test(e.target.value)){
      setImageWidth(e.target.value);
    }

    

    console.log('width=' + imageWidth);
  };
  const handleInputChangeHeight = (e) => {
    if(/^\d+$/.test(e.target.value)){
      setImageHeigth(e.target.value);
    }
    
  };
  const handleInputChangeName = (e) => {
    setNameDataset(e.target.value);
  };
  //Go to ReviewDatasets file when you want to make an overview to data you upload
  const handleOverviewButtonClick = () => {
    if (!imageWidth || !imageHeight || !nameDataset) {
      if (!imageWidth) {
        setWidthError(true);
      }
      if(!imageHeight){
        setHeightError(true);
      }
      if(!nameDataset){
        setNameError(true);
      }
      return;
    } else {
      console.log('Button clicked, perform finish action');
      console.log('Final width=' + imageWidth + 'height=' + imageHeight);
      navigate(
        `review/${selectedValue}?image=${encodeURIComponent(
          JSON.stringify(images),
        )}&label=${encodeURIComponent(
          JSON.stringify(labels),
        )}&width=${imageWidth}&height=${imageHeight}&type=${selectedValue}&name=${nameDataset}&class=${encodeURIComponent(
          JSON.stringify(classes),
        )}`,
      );
    }
  };
  // Go to main folder and then make datasets
  const handleFinish = (event, value) => {
   
    if (!imageWidth || !imageHeight || !nameDataset) {
      if (!imageWidth) {
        setWidthError(true);
      }
      if(!imageHeight){
        setHeightError(true);
      }
      if(!nameDataset){
        setNameError(true);
      }
      return;
    }else{
      window.electronAPI.createDatasetLabels({
        name: nameDataset,
        labels: labels,
        classes: classes,
        images: images,
        type: selectedValue,
        width: imageWidth,
        height: imageHeight,
      });
      navigate('/data');
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
          borderRadius: '16px',
          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            flexDirection: 'column'
          }}
        >
          <FormControl sx={{ display: 'flex', gap: 3, flexDirection: 'column', width: '100%'  }}>
            <Box sx={{display: 'flex', width: '100%', gap: 3}}>
              <InputLabel>{t('type')}</InputLabel>
              <Select
                label={'type'}
                sx={{flex:1, height:'56px'}}
                onChange={handleSelectChange}
              >
                <MenuItem value={'classification'}>
                  {t('image-classification')}
                </MenuItem>
                <MenuItem value={'detection'}>{t('object-detection')}</MenuItem>
                <MenuItem value={'captioning'}>{t('captioning')}</MenuItem>
              </Select>
              <TextField
              variant="outlined"
              placeholder={t('name')}
              error={nameError}
              helperText={nameError ? t('missing-name') : ''}
              onBlur={() => setNameError(nameDataset === '' ? true : false)}
              onChange={handleInputChangeName}
              sx={{ flex: 1}}
             
            />
             
            </Box>
            <Box sx={{display: 'flex', gap: 3}}>
              <TextField
                  variant="outlined"
                  placeholder={t('width')}
                  error={widthError}
                  value={imageWidth}
                  onBlur={() => setWidthError(imageWidth === '' ? true : false)}
                  onChange={handleInputChangeWidth}
                  sx={{flex: 1}}
                />
              <TextField
                variant="outlined"
                placeholder={t('height')}
                error={heightError}
                value={imageHeight}
                helperText={heightError ? t('missing-height') : ''}
                onBlur={() => setHeightError(imageHeight === '' ? true : false)}
                onChange={handleInputChangeHeight}
                sx={{flex: 1}}
              />
            </Box>
          </FormControl>
          {/* <Box> */}
          {/* <Typography color={'text.main'}>{t('no-labels')}</Typography> */}
          <Button sx={{ml: 'auto', mt: 3}}variant="contrast">{t('create-labels')}</Button>
          {/* </Box> */}
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <UploadButton
            onClick={handleClick}
            text={
              textUploadImages == 1
                ? t('choose-image-folder')
                : t('chosen-images')
            }
            //text={t('choose-image-folder')}
            error={uploadImagesError == 1 ? '' : t('no-images-found')}
            uploadItem={images.length}
          />
          <UploadButton
            onClick={handleClickLabel}
            text={
              textUploadLabels == 1 ? t('choоse-labels') : t('chosen-txt-file')
            }
            //text={t('choose-labels')}
            disabled={selectedValue ? false : true}
            icon="file"
            error={uploadLabelsError == 1 ? '' : t('no-labels-found')}
          />
        </Box>
        <Box>
          {showButton && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Button onClick={handleOverviewButtonClick}>
                {t('overview-button')}
              </Button>
              <Button variant="contrast" onClick={handleFinish}>
                {t('finish-button')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
 
export default ImportImage;