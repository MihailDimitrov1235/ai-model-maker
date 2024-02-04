import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
  MenuItem,
  Menu,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ShowDiagrams } from '../Components/Charts/BarChart_GoogleLib';
import CardElement from '../Components/Cards/DatasetCard';
import { Link } from 'react-router-dom';
import React from 'react';
// import python from 'python-shell';
// import path from "path";

// var options = {
//     scriptPath : path.join(__dirname, '/../Backend/'),
//     args : [],
// };

const Datasets = function () {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Box
        sx={{
          margin: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>{t('create-tabular-dataset')}</h2>
        </Box>

        <Box
          sx={{
            marginTop: '55px',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              padding: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography>
                Welcome to the data import process! Follow these steps to import
                data from your table into the system
              </Typography>
              <ul
                sx={{
                  margin: '10px',
                }}
              >
                <li>
                  You will see a preview of your table below. Take a moment to
                  review the data.
                </li>
                <li>
                  Select the columns you want to include in your dataset by
                  checking the corresponding checkboxes.
                </li>
                <li>
                  Hover over the column names to see additional information such
                  as data type and unique values. This can help you make
                  informed decisions.
                </li>
                <li>
                  Click 'Next' to proceed to the next step once you have
                  finalized your column selection.
                </li>
              </ul>
            </CardContent>
            <Button variant="contrast">Next</Button>
          </Card>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: '50px',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                background: '#000',
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    color: '#FFF',
                  }}
                >
                  Dessert (100g serving)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#FFF',
                  }}
                >
                  Calories
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#FFF',
                  }}
                >
                  Fat&nbsp;(g)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#FFF',
                  }}
                >
                  Carbs&nbsp;(g)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#FFF',
                  }}
                >
                  Protein&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Datasets;
