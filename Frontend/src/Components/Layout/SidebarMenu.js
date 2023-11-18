import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function SidebarMenu({ items }) {
  const navigate = useNavigate()
  return (
    <>
      {items.map((item, idx) => (
        <Box
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
                textTransform: "none",
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "start",
                px: 3,
                py: 1,
                "& .MuiButton-startIcon": {
                  color: "text.main",
                },
              }}
            >
              <Typography sx={{ color: "text.main", fontSize: "16px" }}>
                  {item.name}
              </Typography>
            </Button>
        </Box>
      ))}
    </>
  );
}
