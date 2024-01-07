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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import getColumnTypes from '../functions/getCoulumnTypes';

export default function CustomTable({
  data,
  bodyData,
  setBodyData,
  header,
  setHeader,
  headerCheckboxes,
  setHeaderCheckboxes,
}) {
  const [hasHeaders, setHasHeaders] = useState(true);
  const [headerTypes, setHeaderTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

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
      setBodyData(data.slice(1));
    }
    if (hasHeaders) {
      setHeader(data[0] || []);
    } else {
      setHeader(new Array(data[0].length || 0).fill(''));
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
          if (!nextSelectedTypes[i] || !types.includes(nextSelectedTypes[i])) {
            nextSelectedTypes[i] = types[0];
          }
        }
        setSelectedTypes(nextSelectedTypes);
      }
      setHeaderTypes(columnsTypes);
      console.log(selectedTypes);
    }

    setHeaderCheckboxes(new Array(data[0].length || 0).fill(true));
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
        return event.target.value;
      } else {
        return c;
      }
    });
    setSelectedTypes(nextDataTypes);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <InputLabel>{t('has-headers')}</InputLabel>
        <Switch
          checked={hasHeaders}
          onClick={(event) => setHasHeaders(event.target.checked)}
        />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 1 }}>
        <TableContainer sx={{ maxHeight: '500px' }}>
          <Table stickyHeader sx={{ minWidth: 650, overflow: 'scroll' }}>
            <TableHead>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                          onChange={(event) => handleHeaderChange(event, index)}
                        />
                      )}

                      <Tooltip
                        title={t('include') + '?'}
                        placement="top"
                        followCursor
                      >
                        <Checkbox
                          defaultChecked
                          onClick={(event) => handleClickCheckbox(index)}
                        />
                      </Tooltip>
                    </Box>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel>{t('data-type')}</InputLabel>
                      <Select
                        label={t('data-type')}
                        value={selectedTypes[index].type}
                        onChange={(event) =>
                          handleChangeSelectedDataType(event, index)
                        }
                      >
                        {headerTypes[index] &&
                          headerTypes[index].map((item, idx) => (
                            <MenuItem value={item.type}>{item.type}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {hasHeaders
                ? bodyData
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
                      </TableRow>
                    ))
                : data
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
