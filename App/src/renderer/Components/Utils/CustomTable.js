import {
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Box,
  Tooltip,
  Typography,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

export default function CustomTable({
  header,
  bodyData,
  hasHeaders,
  handleHeaderChange = null,
  headerCheckboxes = null,
  handleClickCheckbox = null,
  selectedTypes = null,
  handleChangeSelectedDataType = null,
  headerTypes = null,
  handleDeleteRow = null,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}) {
  const { t } = useTranslation();
  return (
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
                    {hasHeaders || !handleHeaderChange ? (
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

                    {handleClickCheckbox && (
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
                    )}
                  </Box>
                  {handleChangeSelectedDataType && headerTypes && (
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
                  )}
                </TableCell>
              ))}
              {handleDeleteRow && (
                <TableCell
                  sx={{
                    bgcolor: 'primary.dark',
                    color: 'text.contrast',
                    width: '32px',
                  }}
                />
              )}
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
                  {handleDeleteRow && (
                    <TableCell sx={{ width: '32px' }}>
                      <IconButton onClick={() => handleDeleteRow(rowIndex)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  )}
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
  );
}
