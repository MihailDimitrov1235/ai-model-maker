import { useEffect, useState } from 'react';
import { Box, Switch, InputLabel, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import getColumnTypes from '../functions/getCoulumnTypes';
import CustomTable from './CustomTable';

export default function CustomImportTable({
  data,
  setData,
  bodyData,
  setBodyData,
  header,
  setHeader,
  headerCheckboxes,
  setHeaderCheckboxes,
  missingHeader,
  setMissingHeader,
  selectedTypes,
  setSelectedTypes,
  handleFinish,
}) {
  const [hasHeaders, setHasHeaders] = useState(true);
  const [headerTypes, setHeaderTypes] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const firstRowLength = data[0].length;
      for (let i = 0; i < firstRowLength; i++) {
        if (!data[0][i] && data[0][i] !== false && data[0][i] !== 0) {
          data[0].splice(i);
          break;
        }
      }
      data.forEach((row) => row.splice(data[0].length));

      if (hasHeaders) {
        setHeader(data[0] || []);
        setBodyData(data.slice(1));
      } else {
        setHeader(new Array(data[0].length || 0).fill(''));
        setBodyData(data);
      }
    } else {
      setBodyData([]);
    }

    if (data && data.length && data[0].length) {
      let columnsTypes = getColumnTypes(hasHeaders ? data.slice(1) : data);
      if (columnsTypes.length != selectedTypes.length) {
        let nextSelectedTypes = [];
        for (let i = 0; i < columnsTypes.length; i++) {
          const types = columnsTypes[i];
          nextSelectedTypes.push(types[0]);
        }
        setSelectedTypes(nextSelectedTypes);
      } else {
        let nextSelectedTypes = [...selectedTypes];
        for (let i = 0; i < columnsTypes.length; i++) {
          const types = columnsTypes[i];
          const matchingType = types.find(
            (obj) => obj.type === nextSelectedTypes[i].type,
          );
          if (!nextSelectedTypes[i] || !matchingType) {
            nextSelectedTypes[i] = types[0];
          } else {
            nextSelectedTypes[i] = matchingType;
          }
        }
        setSelectedTypes(nextSelectedTypes);
      }
      setHeaderTypes(columnsTypes);
    }

    if (!headerCheckboxes || headerCheckboxes.length != data[0].length) {
      setHeaderCheckboxes(new Array(data[0].length || 0).fill(true));
    }
  }, [data, hasHeaders]);

  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickCheckbox = (index) => {
    const nextCheckboxes = headerCheckboxes.map((c, i) => {
      if (i === index) {
        return !c;
      } else {
        return c;
      }
    });
    setHeaderCheckboxes(nextCheckboxes);
  };

  const handleHeaderChange = (event, index) => {
    const nextHeader = header.map((c, i) => {
      if (i === index) {
        if (index === missingHeader && event.target.value != undefined) {
          setMissingHeader(-1);
        }
        return event.target.value;
      } else {
        return c;
      }
    });
    setHeader(nextHeader);
  };

  const handleChangeSelectedDataType = (event, index) => {
    const nextDataTypes = selectedTypes.map((c, i) => {
      if (i === index) {
        for (let types of headerTypes[index]) {
          if (types?.type == event.target.value) {
            return types;
          }
        }
        return headerTypes[index][0];
      } else {
        return c;
      }
    });
    setSelectedTypes(nextDataTypes);
  };

  const handleDeleteRow = (index) => {
    const actualIndex = page * rowsPerPage + index;
    let newBodyData = [...bodyData];
    newBodyData.splice(actualIndex, 1);
    setBodyData(newBodyData);
    setData([header, ...newBodyData]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* <InputLabel>{t('has-headers')}</InputLabel> */}
        {/* <Switch
          checked={hasHeaders}
          onClick={(event) => setHasHeaders(event.target.checked)}
        /> */}
        <Button onClick={handleFinish} variant="contrast" sx={{ ml: 'auto' }}>
          {t('finish-button')}
        </Button>
      </Box>
      <CustomTable
        header={header}
        bodyData={bodyData}
        hasHeaders={hasHeaders}
        handleHeaderChange={handleHeaderChange}
        headerCheckboxes={headerCheckboxes}
        handleClickCheckbox={handleClickCheckbox}
        selectedTypes={selectedTypes}
        handleChangeSelectedDataType={handleChangeSelectedDataType}
        headerTypes={headerTypes}
        handleDeleteRow={handleDeleteRow}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
}
