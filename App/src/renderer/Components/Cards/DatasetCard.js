import React from 'react';
import { ReactDOM } from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  IconButton,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function DatasetCard({ title, type }) {
  return (
    <Card sx={{ width: '100%', p: 2 }}>
      <CardContent sx={{ p: 0, pb: 2 }}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 'bold',
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          color="text.secondary"
        >
          {title}
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            gap: 1,
          }}
          color="text.secondary"
        >
          <InsertDriveFileIcon />
          {type}
        </Box>
      </CardContent>
      <CardActions
        sx={{
          p: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography>300</Typography>
          <Typography>Records</Typography>
        </Box>

        <Button size="small" variant="contrast">
          Make model
        </Button>
      </CardActions>
    </Card>
  );
}
