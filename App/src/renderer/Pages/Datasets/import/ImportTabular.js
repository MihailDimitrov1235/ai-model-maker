import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../../Components/Utils/CustomTable';
import CustomDialog from '../../../Components/Utils/CustomDialog';
import FillTablular from './FillTablular';

function ImportTabular() {
  const { t } = useTranslation();
  const [file, setFile] = useState(t('select-file'));
  const [data, setData] = useState(null);
  const [header, setHeader] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [headerCheckboxes, setHeaderCheckboxes] = useState([]);
  const [openMissingValues, setOpenMissingValues] = useState(false);
  const [missingRows, setMissingRows] = useState([]);
  const [fill, setFill] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const nameRef = useRef();

  const handleFinish = () => {
    let rows = [];

    //check for missing values
    for (let i = 0; i < bodyData.length; i++) {
      for (let j = 0; j < bodyData[i].length; j++) {
        if (
          headerCheckboxes[j] &&
          (bodyData[i][j] === undefined ||
            bodyData[i][j] === null ||
            bodyData[i][j] === '')
        ) {
          rows.push(i);
          break;
        }
      }
    }

    if (rows.length > 0) {
      setOpenMissingValues(true);
      setMissingRows(rows);
      return;
    }
    if (!nameRef.current.value) {
      setNameError(true);
      return;
    }
    console.log('all goood');
    //create dataset
    let finalHeader = [];
    for (let i = 0; i < header.length; i++) {
      if (headerCheckboxes[i]) {
        finalHeader.push(header[i]);
      }
    }

    let finalBodyData = [];
    for (let i = 0; i < bodyData.length; i++) {
      let row = [];
      for (let j = 0; j < bodyData[i].length; j++) {
        if (headerCheckboxes[j]) {
          row.push(bodyData[i][j]);
        }
      }
      finalBodyData.push(row);
    }

    let finalSelectedTypes = [];
    for (let i = 0; i < selectedTypes.length; i++) {
      if (headerCheckboxes[i]) {
        finalSelectedTypes.push(selectedTypes[i]);
      }
    }

    window.electronAPI.createDatasetTable({
      name: nameRef.current.value,
      header: finalHeader,
      selectedTypes: finalSelectedTypes,
      bodyData: finalBodyData,
    });
  };

  const handleDeleteMissingValueRows = () => {
    setData(
      data.filter((row) =>
        row.every(
          (value, index) =>
            !headerCheckboxes[index] ||
            (value !== undefined && value !== null && value !== ''),
        ),
      ),
    );
    setOpenMissingValues(false);
  };

  const handleFillMissingValues = () => {
    setFill(true);
    setOpenMissingValues(false);
  };

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
      {!fill ? (
        <>
          <CustomDialog
            open={openMissingValues}
            setOpen={setOpenMissingValues}
            loading={false}
            title={t('missing-values-title')}
            text={t('missing-values-text')}
            buttons={[
              {
                text: t('fill-manually'),
                variant: 'main',
                handleClick: () => handleFillMissingValues(),
              },
              {
                text: t('delete-rows'),
                variant: 'contrast',
                handleClick: () => handleDeleteMissingValueRows(),
              },
            ]}
          />
          <Box display={'flex'} justifyContent={'space-between'} gap={3}>
            <TextField
              error={nameError}
              inputRef={nameRef}
              helperText={nameError ? t('missing-name') : ''}
              placeholder={t('name-dataset')}
              sx={{ flex: 1 }}
              onBlur={() =>
                setNameError(nameRef.current.value === '' ? true : false)
              }
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
          {data && data.length && (
            <>
              <CustomTable
                data={data}
                setData={setData}
                bodyData={bodyData}
                setBodyData={setBodyData}
                header={header}
                setHeader={setHeader}
                headerCheckboxes={headerCheckboxes}
                setHeaderCheckboxes={setHeaderCheckboxes}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
              <Button
                onClick={handleFinish}
                variant="contrast"
                sx={{ ml: 'auto' }}
              >
                {t('finish')}
              </Button>
            </>
          )}
        </>
      ) : (
        <FillTablular
          bodyData={bodyData}
          setBodyData={setBodyData}
          missingRows={missingRows}
          setMissingRows={setMissingRows}
          header={header}
          headerCheckboxes={headerCheckboxes}
          setFill={setFill}
          setData={setData}
        />
      )}
    </Box>
  );
}

export default ImportTabular;
