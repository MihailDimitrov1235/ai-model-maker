import { Button, Box, Typography, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import { Zoom } from "@mui/material";

export default function SidebarIconMenu({ items }) {
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
            width:'100%',
            aspectRatio:'1/1',
            px: 1,
            py: 1,
            fontSize: "30px",
          }}
        >
            <Button
              onClick={() => navigate(item.href)}
              sx={{
                bgcolor: isActive?"primary.main":"",
                textTransform: "none",
                width: "100%",
                height:'100%',
                minWidth:'0',
                display: "flex",
                justifyContent: "center",
                flexDirection:'column',
                alignItems:'center',
                // px: 3,
                // py: 1,
                "& .MuiButton-startIcon": {
                  color: isActive?"text.contrast" : "text.main",
                },
                "&:hover":{
                  bgcolor: isActive?"primary.main":"",
                }
              }}
            >
              <Tooltip title={item.name} TransitionComponent={Zoom} placement="right" enterDelay={0} leaveDelay={100} >
                <item.icon sx={{ color: isActive?"text.contrast" : "text.main", }} style={{ fontSize: "220%" }} />
              </Tooltip>
              {/* <Typography sx={{ color: isActive?"text.contrast" : "text.main", fontSize: "16px", fontWeight:500 }}>
                  {item.name}
              </Typography> */}
            </Button>
        </Box>
      )})}
    </>
  );
}
