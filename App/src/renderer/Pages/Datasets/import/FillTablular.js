import {
  Box,
  Pagination,
  Grid,
  InputLabel,
  TextField,
  Button,
} from '@mui/material';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function FillTablular({
  bodyData,
  setBodyData,
  missingRows,
  setMissingRows,
  header,
  headerCheckboxes,
  setFill,
  setData,
}) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    if (value <= missingRows.length) {
      setPage(value);
    }
  };

  const handleChange = (event, index) => {
    let newBodyData = [...bodyData];
    newBodyData[missingRows[page - 1]][index] = event.target.value;
    setBodyData(newBodyData);
  };

  const handleDeleteRow = () => {
    let newBodyData = [...bodyData];
    newBodyData.splice(missingRows[page - 1], 1);
    setBodyData(newBodyData);
    let newMissingRows = [...missingRows];
    newMissingRows.splice(page - 1, 1);
    for (let i = page - 1; i < newMissingRows.length; i++) {
      newMissingRows[i]--;
    }
    if (page > newMissingRows.length) {
      setPage(newMissingRows.length); // Adjust the page here
    }
    if (newMissingRows.length === 0) {
      setFill(false);
      setData([header, ...newBodyData]);
    }
    setMissingRows(newMissingRows);
  };

  return (
    <>
      {missingRows.length && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box display={'flex'} justifyContent={'center'}>
            <Pagination
              count={missingRows.length}
              page={page}
              onChange={handleChangePage}
            />
            <Button onClick={handleDeleteRow}>{t('delete-row')}</Button>
          </Box>
          <Box>
            <Grid container spacing={3} alignItems={'center'}>
              {header.map((title, index) => (
                <Fragment key={index}>
                  {headerCheckboxes[index] && (
                    <>
                      <Grid item xs={12} sm={2}>
                        <InputLabel
                          sx={{
                            display: 'flex',
                            justifyContent: 'right',
                            fontWeight: 700,
                          }}
                        >
                          {title}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <TextField
                          fullWidth
                          value={
                            bodyData[missingRows[page - 1]] &&
                            bodyData[missingRows[page - 1]][index] !==
                              undefined &&
                            bodyData[missingRows[page - 1]][index] !== null
                              ? bodyData[missingRows[page - 1]][index]
                              : ''
                          }
                          onChange={(event) => handleChange(event, index)}
                        />
                      </Grid>
                    </>
                  )}
                </Fragment>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}
