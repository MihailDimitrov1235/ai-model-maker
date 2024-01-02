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
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CustomTable({ data }) {
  const header = data[0];
  const bodyData = data.slice(1);
  const [headerCheckboxes, setHeaderCheckboxes] = useState(
    new Array(header.length).fill(true),
  );

  const { t } = useTranslation()

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
    console.log(nextCheckboxes);
    setHeaderCheckboxes(nextCheckboxes);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '500px' }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650, overflow: 'scroll' }}
        >
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
                    width: '100%',
                  }}
                >
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'150px'}
                  >
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
                    <Tooltip title={t('include') + '?'} placement="top" followCursor>
                    <Checkbox
                      defaultChecked
                      onClick={(event) => handleClickCheckbox(index)}
                    />
                    </Tooltip>
                  </Box>
                </TableCell>
              ))}
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
                        width: '100%',
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
  );
}
