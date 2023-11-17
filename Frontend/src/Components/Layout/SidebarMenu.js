import { Button, Box } from "@mui/material";

export default function SidebarMenu({ items }) {
  return (
    <>
      {items.map((item, idx) => (
        <Box
          sx={{
            px: 2,
            py: 1,
            fontSize:'30px'
          }}
        >
          <Button
            startIcon={<item.icon style={{ fontSize:'22px'}}/>}
            sx={{
                textTransform:'none',
              width: "100%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "start",
              px:3,
              py:1,
              fontSize:'16px'
            }}
          >
            {item.name}
          </Button>
        </Box>
      ))}
    </>
  );
}
