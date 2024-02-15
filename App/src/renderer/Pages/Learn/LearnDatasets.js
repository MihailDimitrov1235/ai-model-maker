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
  CircularProgress,
  List,
  ListItem,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const Datasets = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [queryParameters] = useSearchParams();

  useEffect(() => {
    let id = queryParameters.get('id') != null ? queryParameters.get('id') : '';
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [queryParameters.get('id')]);

  const items = [
    {
      type: 'text',
      title: t('datasets'),
      id: 'datasets',
      titleType: 'h3',
      text: (
        <>
          <b>{t('dataset-bold')}</b>
          {t('datasets-introduction')}
        </>
      ),
    },
    {
      type: 'list',
      title: t('tabular'),
      id: 'tabular',
      listItems: [
        {
          text: (
            <>
              {' '}
              <b>{t('tabular-bold')}</b> {t('tabular-subtext-1')}
            </>
          ),
        },
        {
          text: t('tabular-subtext-2'),
        },
        {
          text: t('tabular-subtext-3'),
        },
      ],
    },
    {
      type: 'list',
      title: t('image-classification'),
      id: 'classification',
      listItems: [
        {
          text: (
            <>
              <b>{t('classification-bold')}</b>
              {t('classification-subtext-1')}
            </>
          ),
        },
        {
          text: t('classification-subtext-2'),
        },
        {
          text: t('classification-subtext-3'),
        },
      ],
    },
    {
      type: 'list',
      title: t('object-detection'),
      id: 'detection',
      listItems: [
        {
          text: (
            <>
              <b>{t('detection-bold')}</b>
              {t('detection-subtext-1')}
            </>
          ),
        },
        {
          text: t('detection-subtext-2'),
        },
        {
          text: t('detection-subtext-3'),
        },
      ],
    },
    {
      type: 'list',
      title: t('captioning'),
      id: 'captioning',
      listItems: [
        {
          text: (
            <>
              <b>{t('captioning-bold')}</b>
              {t('captioning-subtext-1')}
            </>
          ),
        },
        {
          text: t('captioning-subtext-2'),
        },
        {
          text: t('captioning-subtext-3'),
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: '50px',
        gap: 3,
        minHeight: '100%',
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography id={item.id} mt={3} variant={item.titleType || 'h5'}>
            {item.title}
          </Typography>
          {item.type == 'text' && (
            <>
              <Typography mt={2} sx={{ fontSize: 'large' }}>
                {item.text}
              </Typography>
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
                {item.listItems.map((listItem, idx) => (
                  <ListItem key={idx}>{listItem.text}</ListItem>
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
