import { useTranslation } from 'react-i18next';
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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DatasetCard({ title, type, subType, records = null }) {
  const { t } = useTranslation();
  const [labels, setLabels] = useState([]);
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  useEffect(() => {
    let newLabels = [];
    switch (type) {
      case 'table':
        setLink(`/models/create/tabular/${title}`);
        newLabels.push({
          text: t('tabular'),
          icon: <InsertDriveFileIcon />,
        });
        break;
      case 'image':
        newLabels.push({
          text: t('image-data'),
          icon: <InsertDriveFileIcon />,
        });
        switch (subType) {
          case 'classification':
            setLink(`/models/create/image/classification/${title}`);
            newLabels.push({
              text: t('image-classification'),
              icon: <InsertDriveFileIcon />,
            });
            break;
          case 'detection':
            setLink(`/models/create/image/detection/${title}`);
            newLabels.push({
              text: t('object-detection'),
              icon: <InsertDriveFileIcon />,
            });
            break;
          case 'captioning':
            setLink(`/models/create/image/captioning/${title}`);
            newLabels.push({
              text: t('captioning'),
              icon: <InsertDriveFileIcon />,
            });
            break;
        }

        break;
    }
    setLabels(newLabels);
  }, [subType, type]);

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
        {labels.map((label, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              gap: 1,
            }}
            color="text.secondary"
            key={index}
          >
            {label.icon}
            {label.text}
          </Box>
        ))}
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
          <Typography>{records}</Typography>
          <Typography>{t('records')}</Typography>
        </Box>

        <Button onClick={() => navigate(link)} size="small" variant="contrast">
          {t('make-model')}
        </Button>
      </CardActions>
    </Card>
  );
}
