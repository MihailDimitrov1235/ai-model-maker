import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from 'react-router-dom';

export default function SidebarMenu({ items }) {
const navigate = useNavigate()
const location = useLocation();
console.log(location.pathname)
  return (
    <>
      {items.map((item) => {
        const isActive = location.pathname.includes(item.href)
        return(
        <>
          {item.type == "section" ? (
            <Section item={item} isActive={isActive} />
          ) : (
            <ListItemButton
                onClick={() => navigate(item.href)}
              disableRipple
              sx={{
                bgcolor: "",
                color: isActive? "text.main" : "text.dark",
                ":hover": {
                  bgcolor: "transparent",
                  color: "text.main",
                },
              }}
            >
              {/* <ListItemIcon>
                    <SendIcon />
                </ListItemIcon> */}
              <ListItemText primary={item.name} />
            </ListItemButton>
          )}
        </>
      )})}
    </>
  );
}

function Section({ item, isActive }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          bgcolor: "",
          color: isActive? "text.main" : "text.dark",
          ":hover": {
            bgcolor: "transparent",
          },
          ".MuiTypography-root":{
            fontWeight:600,
          }
        }}
        onClick={handleClick}
      >
        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ml:1}}>
          <SidebarMenu items={item.items} />
        </List>
      </Collapse>
    </>
  );
}
