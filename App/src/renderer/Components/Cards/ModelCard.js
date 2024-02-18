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

export default function ModelCard({
  model,
  handleOpenModel,
  subType = null,
  accuracy = null,
}) {
  console.log(model);
  const { t } = useTranslation();
  const [labels, setLabels] = useState([]);
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  useEffect(() => {
    let newLabels = [];
    switch (model.type) {
      case 'table':
        setLink(`/models/create/tabular/${model.name}`);
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
            setLink(`/models/create/image/classification/${model.name}`);
            newLabels.push({
              text: t('image-classification'),
              icon: <InsertDriveFileIcon />,
            });
            break;
          case 'detection':
            setLink(`/models/create/image/detection/${model.name}`);
            newLabels.push({
              text: t('object-detection'),
              icon: <InsertDriveFileIcon />,
            });
            break;
          case 'captioning':
            setLink(`/models/create/image/captioning/${model.name}`);
            newLabels.push({
              text: t('captioning'),
              icon: <InsertDriveFileIcon />,
            });
            break;
        }

        break;
    }
    setLabels(newLabels);
  }, [subType, model.type]);

  const handleUseModel = () => {
    if (subType) {
      navigate(`/use/${model.type}/${subType}/${model.name}`);
    } else {
      navigate(`/use/${model.type}/${model.name}`);
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Button sx={{ width: '100%' }} onClick={handleOpenModel}>
        <Card
          sx={{
            width: '100%',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              sx={{
                height: '40px',
                fontSize: 18,
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              color="text.secondary"
            >
              {model.name}
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
              minHeight: '36.5px',
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
              {model && model.epochs.length > 0 ? (
                <>
                  <Typography>{model.accuracy.toFixed(2)}</Typography>
                  <Typography>{t('accuracy')}</Typography>
                </>
              ) : (
                <Typography>{t('not-trained')}</Typography>
              )}
            </Box>
          </CardActions>
        </Card>
      </Button>
      {model.accuracy ? (
        <Button
          sx={{ position: 'absolute', bottom: 22, right: 24 }}
          onClick={handleUseModel}
          variant="contrast"
        >
          {t('use-model')}
        </Button>
      ) : (
        <Button
          sx={{ position: 'absolute', bottom: 22, right: 24 }}
          onClick={handleOpenModel}
          variant="contrast"
        >
          {t('train-model')}
        </Button>
      )}

      <IconButton sx={{ position: 'absolute', top: 22, right: 24 }}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}
