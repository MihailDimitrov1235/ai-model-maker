import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../../Components/Utils/CustomTable';
import CustomDialog from '../../../Components/Utils/CustomDialog';

function ImportTabular() {
  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'));
  const [data, setData] = useState(null);
  const [header, setHeader] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const nameRef = useRef();
  const [openMissingValues, setOpenMissingValues] = useState(false)

  const handleFinish = () => {
    //check for missing values
    const missingValues = [];

    for (let i = 0; i < bodyData.length; i++) {
      for (let j = 0; j < bodyData[i].length; j++) {
        if (bodyData[i][j] === undefined || bodyData[i][j] === null) {
          missingValues.push(i);
        }
      }
    }

    if(missingValues){
      setOpenMissingValues(true)
    }else{
      //create dataset
    }
  }

  useEffect(() => {
    window.electronAPI.handleSetTabularFile((event, value) => {
      if (!value.canceled) {
        setFile(value.filePaths);
      }
    });
    window.electronAPI.handleSetTabularFileData((event, value) => {
      if (!value.error) {
        setData(value.data);
      }
      console.log(value);
    });
  }, []);

  const handleClick = () => {
    window.electronAPI.selectTabularFile();
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      height={'100%'}
      overflow={'visible'}
      gap={3}
    >
      <CustomDialog open={openMissingValues} loading={false} title={t('missing-values-title')} text={t('missing-values-text')} buttons={[
          { text: t('fill-manually'), variant:'main', handleClick: () => console.log('fill') },
          { text: t('delete-rows'), variant:'contrast', handleClick: () => console.log('delete') },
        ]}/>
      <Box display={'flex'} justifyContent={'space-between'} gap={3}>
        <TextField
          ref={nameRef}
          placeholder={t('name-dataset')}
          sx={{ flex: 1 }}
        />

        <TextField
          sx={{ input: { cursor: 'pointer' }, flex: 1 }}
          variant="outlined"
          value={file}
          onClick={handleClick}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      {data && (
        <>
          <CustomTable
            data={data}
            bodyData={bodyData}
            setBodyData={setBodyData}
            header={header}
            setHeader={setHeader}
          />
          <Button onClick={handleFinish} variant='contrast' sx={{ ml: 'auto' }}>{t('finish')}</Button>
        </>
      )}
    </Box>
  );
}

export default ImportTabular;
