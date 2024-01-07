import { Box, Pagination, Grid, InputLabel, TextField } from '@mui/material';
import { useState, Fragment } from 'react';

export default function FillTablular({
  bodyData,
  setBodyData,
  missingRows,
  header,
  headerCheckboxes,
}) {
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChange = (event, index) => {
    let newBodyData = [...bodyData];
    newBodyData[missingRows[page - 1]][index] = event.target.value;
    setBodyData(newBodyData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          count={missingRows.length}
          page={page}
          onChange={handleChangePage}
        />
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
                        bodyData[missingRows[page - 1]][index] === undefined ||
                        bodyData[missingRows[page - 1]][index] === null
                          ? ''
                          : bodyData[missingRows[page - 1]][index]
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
  );
}
