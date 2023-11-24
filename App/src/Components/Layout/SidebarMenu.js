import { Button, Box, Typography } from "@mui/material";
import { useNavigate, matchPath, useLocation } from 'react-router-dom';

export default function SidebarMenu({ items }) {
  const navigate = useNavigate()
  const location = useLocation();

  return (
    <>
      {items.map((item, idx) => {
        const isActive = location.pathname === item.href
        return(
        <Box
          key={idx}
          sx={{
            px: 2,
            py: 1,
            fontSize: "30px",
          }}
        >
            <Button
              onClick={() => navigate(item.href)}
              startIcon={<item.icon style={{ fontSize: "22px" }} />}
              sx={{
                bgcolor: isActive?"primary.main":"",
                textTransform: "none",
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "start",
                px: 3,
                py: 1,
                "& .MuiButton-startIcon": {
                  color: isActive?"text.contrast" : "text.main",
                },
                "&:hover":{
                  bgcolor: isActive?"primary.main":"",
                }
              }}
            >
              <Typography sx={{ color: isActive?"text.contrast" : "text.main", fontSize: "16px", fontWeight:500 }}>
                  {item.name}
              </Typography>
            </Button>
        </Box>
      )})}
    </>
  );
}
