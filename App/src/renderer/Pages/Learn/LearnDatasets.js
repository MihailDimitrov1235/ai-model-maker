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
import { useNavigate } from 'react-router-dom';

const Datasets = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const items = [
    {
      type: 'text',
      title: 'datasets',
      titleType: 'h4',
      text: (
        <>
          <b>Datasets</b> are structured collections of data used for analysis,
          research, or training machine learning models. They consist of
          individual data points, each representing an observation or sample,
          along with attributes or features describing those samples.
        </>
      ),
    },
    {
      type: 'list',
      title: 'tabular',
      listItems: [
        {
          text: (
            <>
              Tabular data, often likened to a spreadsheet, is structured in
              rows and columns. Each row represents an individual observation,
              while each column denotes a specific attribute or feature
              associated with that observation.
            </>
          ),
        },
        {
          text: (
            <>
              In simpler terms, think of it as an organized table where each row
              describes something, like a customer's information or a product's
              characteristics. For instance, in a customer database, each row
              might represent a different customer, with columns containing
              details such as their age, gender, and purchase history.
            </>
          ),
        },
        {
          text: (
            <>
              Labels in tabular datasets typically indicate what we're trying to
              predict or understand, like whether a customer will make a
              purchase or not. This type of data is commonly used in predictive
              modeling and decision-making tasks, making it a fundamental aspect
              of machine learning for analyzing and understanding structured
              information.
            </>
          ),
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
      {items.map((item) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant={item.titleType || 'h5'}>{item.title}</Typography>
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
                {/* <ListSubheader sx={{
                fontWeight: 700, lineHeight: '24px', fontSize: '16px', color: 'black'
              }}
              >
                Search Help
              </ListSubheader> */}
                {item.listItems.map((listItem) => (
                  <ListItem>{listItem.text}</ListItem>
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
