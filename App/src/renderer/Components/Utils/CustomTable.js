import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CustomTable({ data }) {
  const [header, setHeader] = useState([]);
  useEffect(() => {
    setHeader(data.shift());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {header.map((cell) => (
              <TableCell align="right">{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell) => (
                <TableCell align="right">{cell}</TableCell>
              ))}
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
