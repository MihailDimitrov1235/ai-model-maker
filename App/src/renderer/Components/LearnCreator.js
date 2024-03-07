import {
  Box,
  Typography,
  List,
  ListItem,
  TabList,
  Tab,
  TabPanel,
  Card,
  Tabs,
} from '@mui/material';
import { useState } from 'react';

export default function LearnCreator({ items }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 3,
        gap: 3,
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
          <Typography variant={item.titleType || 'h5'} id={item.id || ''}>
            {item.title}
          </Typography>
          {item.type == 'text' && (
            <>
              {item.paragraphs.map((paragraph, i) => (
                <Typography key={i}>{paragraph}</Typography>
              ))}
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
                  <ListItem key={idx} id={listItem.subId || ''}>
                    {listItem.text}
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {item.type == 'tabs' && <CustomTabs item={item} />}
        </Box>
      ))}
    </Box>
  );
}

function CustomTabs({ item }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange}>
        {item.tabs.map((tab, idx) => (
          <Tab key={idx} label={tab.label} value={idx} />
        ))}
      </Tabs>
      <LearnCreator items={item.tabs[value].items} />
    </Box>
  );
}
