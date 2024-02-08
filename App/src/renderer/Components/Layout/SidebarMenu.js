import { useState } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  Box
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SidebarMenu({ items }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleButtonClick = (href) => {
    navigate(href);
  };

  return (
    <>
      {items.map((item) => {
        const isActive = location.pathname.includes(item.href);
        return (
          <div key={t(item.name)}>
            {item.type === 'section' ? (
              <Section item={item} />
            ) : (
              <ListItemButton
                onClick={() => handleButtonClick(item.href)}
                disableRipple
                sx={{
                  bgcolor: '',
                  color: isActive ? 'text.main' : 'text.dark',
                  ':hover': {
                    bgcolor: 'transparent',
                    color: 'text.main',
                  },
                }}
              >
                <ListItemText primary={t(item.name)} />
              </ListItemButton>
            )}
          </div>
        );
      })}
    </>
  );
}

function Section({ item }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTextClick = (href) => {
    navigate(href);
  };

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          bgcolor: '',
          color: 'text.main',
          ':hover': {
            bgcolor: 'transparent',
          },
          '.MuiTypography-root': {
            fontWeight: 600,
          },
        }}
      >
        <ListItemText
          onClick={() => handleTextClick(item.href)}
          primary={t(item.name)}
        />
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box display={'flex'} sx={{ ml: 2 }}>
        <Divider orientation="vertical" variant="middle" flexItem />
        <List component="div" disablePadding >
          <SidebarMenu items={item.items} />
        </List>
        </Box>
        
      </Collapse>
    </>
  );
}
