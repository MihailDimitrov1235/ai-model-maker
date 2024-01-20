import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  Typography,
  Checkbox,
  Box,
  Switch,
  InputLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import getColumnTypes from '../functions/getCoulumnTypes';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomTable({
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
        <InputLabel>{t('has-headers')}</InputLabel>
        <Switch
          checked={hasHeaders}
          onClick={(event) => setHasHeaders(event.target.checked)}
        />
        <Button onClick={handleFinish} variant="contrast" sx={{ ml: 'auto' }}>
          {t('finish-button')}
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 1 }}>
        <TableContainer sx={{ maxHeight: '500px' }}>
          <Table stickyHeader sx={{ minWidth: 650, overflow: 'scroll' }}>
            <TableHead>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {header.map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      bgcolor: 'primary.dark',
                      color: 'text.contrast',
                      minWidth: '150px',
                      flex: 1,
                    }}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      {hasHeaders ? (
                        <Tooltip title={column} placement="top" followCursor>
                          <Typography
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {column}
                          </Typography>
                        </Tooltip>
                      ) : (
                        <TextField
                          error={index === missingHeader}
                          helperText={
                            index === missingHeader ? t('missing-value') : ''
                          }
                          onChange={(event) => handleHeaderChange(event, index)}
                          inputProps={{ style: { color: 'white' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                color: 'text.contrast',
                                borderColor: 'border.lightContrast',
                              },
                              '&:hover fieldset': {
                                borderColor: 'border.contrast',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'border.contrast',
                              },
                            },
                          }}
                        />
                      )}

                      <Tooltip
                        title={t('include') + '?'}
                        placement="top"
                        followCursor
                      >
                        <Checkbox
                          checked={headerCheckboxes[index]}
                          onClick={(event) => handleClickCheckbox(index)}
                        />
                      </Tooltip>
                    </Box>
                    <FormControl
                      fullWidth
                      sx={{
                        mt: 3,
                        color: 'text.contrast',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            color: 'border.contrast',
                            borderColor: 'border.lightContrast',
                          },
                          '& svg': {
                            color: 'border.contrast',
                          },
                          '& div': {
                            color: 'text.contrast',
                          },
                          '&:hover fieldset': {
                            borderColor: 'border.contrast',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'border.contrast',
                          },
                        },
                      }}
                    >
                      <InputLabel sx={{ color: 'text.contrast' }}>
                        {t('data-type')}
                      </InputLabel>
                      <Select
                        label={t('data-type')}
                        value={selectedTypes[index]?.type || ''}
                        onChange={(event) =>
                          handleChangeSelectedDataType(event, index)
                        }
                      >
                        {headerTypes[index] &&
                          headerTypes[index].map((item, idx) => (
                            <MenuItem key={idx} value={item?.type || {}}>
                              {item?.type || ''}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    bgcolor: 'primary.dark',
                    color: 'text.contrast',
                    width: '32px',
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {bodyData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        sx={{
                          minWidth: '150px',
                          flex: 1,
                        }}
                      >
                        <Tooltip title={cell} placement="top" followCursor>
                          <Typography
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {cell}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                    ))}
                    <TableCell sx={{ width: '32px' }}>
                      <IconButton onClick={() => handleDeleteRow(rowIndex)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={bodyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
