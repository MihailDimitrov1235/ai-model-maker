import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Datasets = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    let id = queryParameters.get('id') != null ? queryParameters.get('id') : '';
    const element = document.getElementById(queryParameters.get('id'));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [queryParameters]);

  const items = [
    {
      type: 'text',
      title: t('learn-ai'),
      titleType: 'h3',
      text: <>{t('ml-introduction')}</>,
    },
    {
      type: 'text',
      title: t('neural-network'),
      titleType: 'h4',
      text: t('neural-network-text'),
    },

    {
      type: 'text',
      title: t('neurons'),
      id: 'neurons',
      text: t('neurons-text'),
    },

    {
      type: 'list',
      title: t('layers'),
      id: 'layers',
      listItems: [
        {
          text: t('dense-text'),
          subId: 'dense',
        },
        {
          text: t('dropout-text'),
          subId: 'dropout',
        },
        {
          text: t('conv2D-text'),
          subId: 'conv-2D',
        },
        {
          text: t('max-poling2D-text'),
          subId: 'max-pooling-2D',
        },
      ],
    },
    {
      type: 'text',
      title: t('batch-size'),
      id: 'batch-size',
      text: t('batch-size-text'),
    },
    {
      type: 'list',
      title: t('dataset-split'),
      id: 'dataset-split',
      listItems: [
        {
          text: t('training-text'),
          subId: 'training',
        },
        {
          text: t('validation-text'),
          subId: 'validation',
        },
        {
          text: t('testing-text'),
          subId: 'testing',
        },
      ],
    },
    {
      type: 'text',
      title: t('weights-bias'),
      id: 'weight-bias',
      text: t('weights-bias-text'),
    },
    {
      type: 'text',
      title: t('target'),
      id: 'target',
      text: t('target-text'),
    },
    {
      type: 'text',
      title: t('learning-rate'),
      id: 'learning-rate',
      text: t('learning-rate-text'),
    },
    {
      type: 'text',
      title: t('epoch'),
      id: 'epoch',
      text: t('epoch-text'),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 3,
        gap: 3,
      }}
    >
      {items.map((item) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant={item.titleType || 'h5'} id={item.id || ''}>
            {item.title}
          </Typography>
          {item.type == 'text' && (
            <>
              <Typography sx={{ fontSize: 'large' }}>{item.text}</Typography>
            </>
          )}
          {item.type == 'list' && (
            <>
              <List
                sx={{
                  listStyleType: 'disc',
                  pl: 2,
                  '& .MuiListItem-root': {
                    display: 'list-item',
                  },
                }}
              >
                {item.listItems.map((listItem) => (
                  <ListItem id={listItem.subId || ''}>{listItem.text}</ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Datasets;
